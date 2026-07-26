import FoundersClient from "./FoundersClient";
import { Metadata } from "next";
import { getFoundersJsonLd, getBreadcrumbJsonLd, getSiteUrl, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Founders & Leadership Team | Electra Weighing Systems (EWS)",
  description:
    "Meet Paulraj.S (Founder & Managing Director) and Silambarasan.R (Director & Technical Co-Founder) of Electra Weighing Systems (EWS), leading industrial weighing machine & SPM automation pioneers.",
  keywords: [
    "Paulraj S Electra Weighing Systems",
    "Silambarasan R EWS",
    "Electra Weighing Systems founders",
    "EWS leadership team",
    "industrial weighing machine directors",
    "Paulraj S founder",
    "weighing systems engineering leaders",
  ],
  alternates: {
    canonical: getSiteUrl("/founders"),
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: getSiteUrl("/founders"),
    title: "Founders & Leadership Team | Electra Weighing Systems (EWS)",
    description:
      "Meet Paulraj.S and Silambarasan.R, founders of Electra Weighing Systems (EWS), pioneers in industrial load cells, dynamic checkweighers, and SPM automation.",
    siteName: "Electra Weighing Systems (EWS)",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Electra Weighing Systems Founders & Leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founders & Leadership | Electra Weighing Systems (EWS)",
    description:
      "Meet Paulraj.S & Silambarasan.R, founders of Electra Weighing Systems (EWS). Pioneering industrial weighing automation.",
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

export default function FoundersPage() {
  const foundersJsonLd = getFoundersJsonLd();
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Founders & Leadership", url: "/founders" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foundersJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FoundersClient />
    </>
  );
}
