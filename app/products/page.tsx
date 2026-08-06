import { getProducts } from "@/lib/products";
import ProductsClientCatalog from "./ProductsClientCatalog";
import { Metadata } from "next";
import { getProductsItemListJsonLd, getBreadcrumbJsonLd, getSiteUrl, SITE_URL } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Industrial Weighing Machines & Product Catalog | Electra Weighing Systems (EWS)",
  description:
    "Explore the complete lineup of Electra Weighing Systems (EWS) products: digital load cell systems, dynamic checkweighers, hopper batching rigs, and custom SPM weighing automation machinery.",
  keywords: [
    "EWS product catalog",
    "industrial weighing machine catalog",
    "rice packing machine",
    "loading conveyor",
    "secondary packaging machine",
    "auto packing machine",
    "load cell systems list",
    "dynamic checkweighers products",
    "hopper batching machinery",
    "SPM weighing machines list",
    "Electra Weighing Systems catalog",
  ],
  alternates: {
    canonical: getSiteUrl("/products"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getSiteUrl("/products"),
    title: "Industrial Weighing Machines & Product Catalog | Electra Weighing Systems (EWS)",
    description:
      "Full product catalog of high-accuracy industrial weighing machines, strain-gauge load cells, inline dynamic checkweighers, and automated batching rigs.",
    siteName: "Electra Weighing Systems (EWS)",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Electra Weighing Systems Product Catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Weighing Machines & Catalog | Electra Weighing Systems (EWS)",
    description:
      "Explore high-accuracy weighing machines, digital load cell systems, and SPM automation solutions from EWS.",
    images: [`${SITE_URL}/og-image.jpg`],
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

export default async function ProductsPage() {
  const products = await getProducts();

  const itemListJsonLd = getProductsItemListJsonLd(products);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Products Catalog", url: "/products" },
  ]);

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Electra Weighing Systems Product Catalog",
    description:
      "Catalog of industrial weighing machines, digital load cell systems, dynamic checkweighers, hopper batching rigs, and SPM automation.",
    url: getSiteUrl("/products"),
    mainEntity: itemListJsonLd,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductsClientCatalog initialProducts={products} />
    </>
  );
}
