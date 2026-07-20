import { NextResponse } from 'next/server';
import { 
  getAllProductsFromDb, 
  getProductFromDbById, 
  saveProductToDb, 
  updateProductInDb, 
  deleteProductFromDb 
} from '@/lib/db';
import { Product } from '@/lib/products';

// GET /api/products or /api/products?id=spm
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const product = await getProductFromDbById(id);
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ product });
    }

    const products = await getAllProductsFromDb();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('API GET /api/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products - Add product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });
    }

    const newProduct: Product = {
      id: body.id || '',
      title: body.title,
      subtitle: body.subtitle || '',
      category: body.category,
      desc: body.desc || '',
      fullDescription: body.fullDescription || body.desc || '',
      image: body.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
      gallery: Array.isArray(body.gallery) ? body.gallery : [body.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop'],
      videoUrl: body.videoUrl || undefined,
      features: Array.isArray(body.features) ? body.features : [],
      specs: body.specs || {},
      applications: Array.isArray(body.applications) ? body.applications : [],
      benefits: Array.isArray(body.benefits) ? body.benefits : [],
    };

    const saved = await saveProductToDb(newProduct);
    return NextResponse.json({ success: true, product: saved }, { status: 201 });
  } catch (error) {
    console.error('API POST /api/products error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// PUT /api/products - Edit product
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updatedFields } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required for updating' }, { status: 400 });
    }

    const updated = await updateProductInDb(id, updatedFields);
    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error('API PUT /api/products error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products?id=spm or body { id: 'spm' }
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {
        // body might be empty if deleted via searchParams
      }
    }

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required for deletion' }, { status: 400 });
    }

    const deleted = await deleteProductFromDb(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Product not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Product ${id} deleted successfully` });
  } catch (error) {
    console.error('API DELETE /api/products error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
