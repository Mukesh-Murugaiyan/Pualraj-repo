import { getAllProductsFromDb } from "@/lib/db";
import HomeClient from "@/components/HomeClient";
import { getProductsItemListJsonLd, getFoundersJsonLd } from "@/lib/seo";

export const revalidate = 60;

export default async function Home() {
  const products = await getAllProductsFromDb();
  const itemListJsonLd = getProductsItemListJsonLd(products);
  const foundersJsonLd = getFoundersJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foundersJsonLd) }}
      />
      <HomeClient initialProducts={products} />
    </>
  );
}
