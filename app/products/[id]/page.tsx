import { getProducts, getProductById } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductJsonLd, getBreadcrumbJsonLd, getSiteUrl, SITE_URL } from "@/lib/seo";

export const dynamicParams = true;
export const revalidate = 60;

// Generate static params for products
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error("Error generating static params for products:", error);
    return [];
  }
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Electra Weighing Systems (EWS)",
      description: "The requested industrial weighing product could not be found.",
    };
  }

  const pageTitle = `${product.title} - ${product.category} | Electra Weighing Systems (EWS)`;
  const description = product.desc || product.fullDescription;
  const productUrl = getSiteUrl(`/products/${product.id}`);
  const imageUrl = product.image ? (product.image.startsWith("http") ? product.image : getSiteUrl(product.image)) : `${SITE_URL}/og-image.jpg`;

  const keywords = [
    product.title,
    product.category,
    "Electra Weighing Systems",
    "EWS industrial machine",
    ...(product.features || []),
    ...(product.applications || []),
  ].slice(0, 10);

  return {
    title: pageTitle,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: productUrl,
      title: pageTitle,
      description: description,
      siteName: "Electra Weighing Systems (EWS)",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const productJsonLd = getProductJsonLd(product);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.title, url: `/products/${product.id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
