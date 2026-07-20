import { getProductById, getRelatedProducts, PRODUCTS } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

// Generate static params for all products for fast dynamic rendering
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | TCP Automation",
    };
  }

  return {
    title: `${product.title} - ${product.category} | TCP Automation`,
    description: product.desc,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 3);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
