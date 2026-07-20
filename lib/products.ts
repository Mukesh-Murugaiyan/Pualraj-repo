import { getAllProductsFromDb, getProductFromDbById } from './db';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  videoUrl?: string;
  features: string[];
  specs: Record<string, string>;
  applications: string[];
  benefits: string[];
}

/**
 * Real-time product queries backed by Cloudflare R2 and persistent database storage
 */
export async function getProducts(): Promise<Product[]> {
  return await getAllProductsFromDb();
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return await getProductFromDbById(id);
}

export async function getRelatedProducts(currentId: string, limit: number = 3): Promise<Product[]> {
  const products = await getAllProductsFromDb();
  return products.filter((product) => product.id !== currentId).slice(0, limit);
}
