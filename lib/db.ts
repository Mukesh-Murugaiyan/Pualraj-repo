import fs from 'fs';
import path from 'path';
import { Pool as PgPool } from 'pg';
import mysql from 'mysql2/promise';
import { Product } from './products';
import { isR2Configured, fetchProductsFromR2, saveProductsToR2 } from './r2';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'products.json');

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.MYSQL_URL;

// PostgreSQL Client Pool Initialization
let pgPool: PgPool | null = null;
let mysqlPool: mysql.Pool | null = null;

if (databaseUrl) {
  if (databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://')) {
    try {
      const needsSsl = databaseUrl.includes('neon.tech') || databaseUrl.includes('sslmode=require') || databaseUrl.includes('amazonaws.com') || process.env.NODE_ENV === 'production';
      pgPool = new PgPool({
        connectionString: databaseUrl,
        ssl: needsSsl ? { rejectUnauthorized: false } : false,
      });
      console.log('PostgreSQL database pool initialized.');
    } catch (err) {
      console.error('PostgreSQL connection error:', err);
    }
  } else if (databaseUrl.startsWith('mysql://')) {
    try {
      mysqlPool = mysql.createPool(databaseUrl);
      console.log('MySQL database pool initialized.');
    } catch (err) {
      console.error('MySQL connection error:', err);
    }
  }
}

// Auto-initialize SQL table schema
let isTableInitialized = false;
async function ensureSqlTable() {
  if (isTableInitialized) return;

  if (pgPool) {
    try {
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(255) PRIMARY KEY,
          title TEXT NOT NULL,
          subtitle TEXT,
          category VARCHAR(255) NOT NULL,
          desc_text TEXT,
          full_description TEXT,
          image TEXT NOT NULL,
          gallery TEXT,
          video_url TEXT,
          features TEXT,
          specs TEXT,
          applications TEXT,
          benefits TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      isTableInitialized = true;
    } catch (err) {
      console.error('Failed to initialize PostgreSQL table:', err);
    }
  } else if (mysqlPool) {
    try {
      await mysqlPool.query(`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(255) PRIMARY KEY,
          title TEXT NOT NULL,
          subtitle TEXT,
          category VARCHAR(255) NOT NULL,
          desc_text TEXT,
          full_description TEXT,
          image TEXT NOT NULL,
          gallery TEXT,
          video_url TEXT,
          features TEXT,
          specs TEXT,
          applications TEXT,
          benefits TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      isTableInitialized = true;
    } catch (err) {
      console.error('Failed to initialize MySQL table:', err);
    }
  }
}

function parseJsonField<T>(value: any, fallback: T): T {
  if (!value) return fallback;
  if (typeof value === 'object') return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// Helper for local disk storage fallback
function getLocalProducts(): Product[] {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(content);
      if (Array.isArray(data)) {
        return data as Product[];
      }
    }
    return [];
  } catch (error) {
    console.error('Local database read error:', error);
    return [];
  }
}

function saveLocalProducts(products: Product[]) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('Local database write error:', error);
  }
}

// Memory Cache Management
let cachedProducts: Product[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

export function invalidateProductCache() {
  cachedProducts = null;
  cacheTimestamp = 0;
}

/**
 * Fetch all products (Primary: Memory Cache -> PostgreSQL / MySQL -> Cloudflare R2 -> Fallback: Local JSON)
 */
export async function getAllProductsFromDb(options?: { forceFresh?: boolean }): Promise<Product[]> {
  const forceFresh = options?.forceFresh ?? false;
  const now = Date.now();

  if (!forceFresh && cachedProducts !== null && (now - cacheTimestamp) < CACHE_TTL_MS) {
    return cachedProducts;
  }

  await ensureSqlTable();

  // 1. PostgreSQL Strategy
  if (pgPool) {
    try {
      const res = await pgPool.query('SELECT * FROM products ORDER BY created_at DESC');
      if (res.rows && res.rows.length > 0) {
        const products = res.rows.map((row) => ({
          id: row.id,
          title: row.title,
          subtitle: row.subtitle || '',
          category: row.category,
          desc: row.desc_text || '',
          fullDescription: row.full_description || row.desc_text || '',
          image: row.image,
          gallery: parseJsonField<string[]>(row.gallery, []),
          videoUrl: row.video_url || undefined,
          features: parseJsonField<string[]>(row.features, []),
          specs: parseJsonField<Record<string, string>>(row.specs, {}),
          applications: parseJsonField<string[]>(row.applications, []),
          benefits: parseJsonField<string[]>(row.benefits, []),
        }));
        cachedProducts = products;
        cacheTimestamp = Date.now();
        return products;
      }
    } catch (err) {
      console.error('Error fetching products from PostgreSQL:', err);
    }
  }

  // 2. MySQL Strategy
  if (mysqlPool) {
    try {
      const [rows] = await mysqlPool.query<any[]>('SELECT * FROM products ORDER BY created_at DESC');
      if (rows && rows.length > 0) {
        const products = rows.map((row) => ({
          id: row.id,
          title: row.title,
          subtitle: row.subtitle || '',
          category: row.category,
          desc: row.desc_text || '',
          fullDescription: row.full_description || row.desc_text || '',
          image: row.image,
          gallery: parseJsonField<string[]>(row.gallery, []),
          videoUrl: row.video_url || undefined,
          features: parseJsonField<string[]>(row.features, []),
          specs: parseJsonField<Record<string, string>>(row.specs, {}),
          applications: parseJsonField<string[]>(row.applications, []),
          benefits: parseJsonField<string[]>(row.benefits, []),
        }));
        cachedProducts = products;
        cacheTimestamp = Date.now();
        return products;
      }
    } catch (err) {
      console.error('Error fetching products from MySQL:', err);
    }
  }

  // 3. Cloudflare R2 Strategy
  if (isR2Configured) {
    const r2Products = await fetchProductsFromR2();
    if (r2Products && r2Products.length > 0) {
      cachedProducts = r2Products;
      cacheTimestamp = Date.now();
      return r2Products;
    }
  }

  const localProducts = getLocalProducts();
  if (localProducts.length > 0) {
    cachedProducts = localProducts;
    cacheTimestamp = Date.now();
  }
  return localProducts;
}

/**
 * Get product by ID
 */
export async function getProductFromDbById(id: string): Promise<Product | undefined> {
  const products = await getAllProductsFromDb();
  return products.find((p) => p.id === id);
}

/**
 * Save new product to PostgreSQL / MySQL / Cloudflare R2
 */
export async function saveProductToDb(newProduct: Product): Promise<Product> {
  await ensureSqlTable();
  const products = await getAllProductsFromDb();

  let targetId = newProduct.id.trim() || newProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!targetId) {
    targetId = 'prod-' + Date.now();
  }

  let finalId = targetId;
  let counter = 1;
  while (products.some((p) => p.id === finalId)) {
    finalId = `${targetId}-${counter}`;
    counter++;
  }

  const productToSave: Product = {
    ...newProduct,
    id: finalId,
    gallery: Array.isArray(newProduct.gallery) ? newProduct.gallery : [],
    features: Array.isArray(newProduct.features) ? newProduct.features : [],
    specs: newProduct.specs || {},
    applications: Array.isArray(newProduct.applications) ? newProduct.applications : [],
    benefits: Array.isArray(newProduct.benefits) ? newProduct.benefits : [],
  };

  // 1. Save to PostgreSQL if connected
  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO products (id, title, subtitle, category, desc_text, full_description, image, gallery, video_url, features, specs, applications, benefits)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          productToSave.id,
          productToSave.title,
          productToSave.subtitle,
          productToSave.category,
          productToSave.desc,
          productToSave.fullDescription,
          productToSave.image,
          JSON.stringify(productToSave.gallery),
          productToSave.videoUrl || null,
          JSON.stringify(productToSave.features),
          JSON.stringify(productToSave.specs),
          JSON.stringify(productToSave.applications),
          JSON.stringify(productToSave.benefits),
        ]
      );
      console.log(`Saved product ${finalId} to PostgreSQL.`);
    } catch (err) {
      console.error('Error inserting product to PostgreSQL:', err);
    }
  }

  // 2. Save to MySQL if connected
  if (mysqlPool) {
    try {
      await mysqlPool.query(
        `INSERT INTO products (id, title, subtitle, category, desc_text, full_description, image, gallery, video_url, features, specs, applications, benefits)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          productToSave.id,
          productToSave.title,
          productToSave.subtitle,
          productToSave.category,
          productToSave.desc,
          productToSave.fullDescription,
          productToSave.image,
          JSON.stringify(productToSave.gallery),
          productToSave.videoUrl || null,
          JSON.stringify(productToSave.features),
          JSON.stringify(productToSave.specs),
          JSON.stringify(productToSave.applications),
          JSON.stringify(productToSave.benefits),
        ]
      );
      console.log(`Saved product ${finalId} to MySQL.`);
    } catch (err) {
      console.error('Error inserting product to MySQL:', err);
    }
  }

  // 3. Save to Cloudflare R2 bucket
  const updatedList = [productToSave, ...products.filter((p) => p.id !== productToSave.id)];
  if (isR2Configured) {
    await saveProductsToR2(updatedList);
  }

  saveLocalProducts(updatedList);
  invalidateProductCache();
  return productToSave;
}

/**
 * Update product in PostgreSQL / MySQL / Cloudflare R2
 */
export async function updateProductInDb(id: string, updatedData: Partial<Product>): Promise<Product | null> {
  await ensureSqlTable();
  const products = await getAllProductsFromDb();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = products[index];
  const updatedProduct: Product = {
    ...existing,
    ...updatedData,
    id: existing.id,
    gallery: Array.isArray(updatedData.gallery) ? updatedData.gallery : existing.gallery,
    features: Array.isArray(updatedData.features) ? updatedData.features : existing.features,
    specs: updatedData.specs !== undefined ? updatedData.specs : existing.specs,
    applications: Array.isArray(updatedData.applications) ? updatedData.applications : existing.applications,
    benefits: Array.isArray(updatedData.benefits) ? updatedData.benefits : existing.benefits,
  };

  if (pgPool) {
    try {
      await pgPool.query(
        `UPDATE products SET 
          title = $1, subtitle = $2, category = $3, desc_text = $4, full_description = $5,
          image = $6, gallery = $7, video_url = $8, features = $9, specs = $10,
          applications = $11, benefits = $12
         WHERE id = $13`,
        [
          updatedProduct.title,
          updatedProduct.subtitle,
          updatedProduct.category,
          updatedProduct.desc,
          updatedProduct.fullDescription,
          updatedProduct.image,
          JSON.stringify(updatedProduct.gallery),
          updatedProduct.videoUrl || null,
          JSON.stringify(updatedProduct.features),
          JSON.stringify(updatedProduct.specs),
          JSON.stringify(updatedProduct.applications),
          JSON.stringify(updatedProduct.benefits),
          id,
        ]
      );
    } catch (err) {
      console.error('Error updating product in PostgreSQL:', err);
    }
  }

  if (mysqlPool) {
    try {
      await mysqlPool.query(
        `UPDATE products SET 
          title = ?, subtitle = ?, category = ?, desc_text = ?, full_description = ?,
          image = ?, gallery = ?, video_url = ?, features = ?, specs = ?,
          applications = ?, benefits = ?
         WHERE id = ?`,
        [
          updatedProduct.title,
          updatedProduct.subtitle,
          updatedProduct.category,
          updatedProduct.desc,
          updatedProduct.fullDescription,
          updatedProduct.image,
          JSON.stringify(updatedProduct.gallery),
          updatedProduct.videoUrl || null,
          JSON.stringify(updatedProduct.features),
          JSON.stringify(updatedProduct.specs),
          JSON.stringify(updatedProduct.applications),
          JSON.stringify(updatedProduct.benefits),
          id,
        ]
      );
    } catch (err) {
      console.error('Error updating product in MySQL:', err);
    }
  }

  products[index] = updatedProduct;

  if (isR2Configured) {
    await saveProductsToR2(products);
  }

  saveLocalProducts(products);
  invalidateProductCache();
  return updatedProduct;
}

/**
 * Delete product from PostgreSQL / MySQL / Cloudflare R2
 */
export async function deleteProductFromDb(id: string): Promise<boolean> {
  await ensureSqlTable();

  if (pgPool) {
    try {
      await pgPool.query('DELETE FROM products WHERE id = $1', [id]);
    } catch (err) {
      console.error('Error deleting product from PostgreSQL:', err);
    }
  }

  if (mysqlPool) {
    try {
      await mysqlPool.query('DELETE FROM products WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting product from MySQL:', err);
    }
  }

  const products = await getAllProductsFromDb();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;

  if (isR2Configured) {
    await saveProductsToR2(filtered);
  }

  saveLocalProducts(filtered);
  invalidateProductCache();
  return true;
}
