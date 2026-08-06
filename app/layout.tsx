import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, getOrganizationJsonLd, getLocalBusinessJsonLd, getWebSiteJsonLd, getFaqJsonLd } from "@/lib/seo";


const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Electra Weighing Systems (EWS) | Industrial Weighing & SPM Automation",
    template: "%s | Electra Weighing Systems (EWS)",
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  description:
    "Electra Weighing Systems (EWS) designs and manufactures high-accuracy industrial weighing machines, digital load cell systems, dynamic inline checkweighers, hopper batching rigs, and custom SPM weighing automation solutions.",
  keywords: [
    "Electra Weighing Systems",
    "EWS weighing machines",
    "industrial weighing machine manufacturer",
    "rice packing machine",
    "loading conveyor",
    "secondary packaging machine",
    "auto packing machine",
    "load cell system supplier",
    "dynamic checkweighers",
    "hopper batching automation",
    "SPM weighing machines",
    "digital strain gauge load cells",
    "Paulraj S Electra Weighing",
    "Silambarasan R EWS",
  ],
  authors: [
    { name: "Paulraj.S", url: `${SITE_URL}/founders` },
    { name: "Silambarasan.R", url: `${SITE_URL}/founders` },
  ],
  creator: "Electra Weighing Systems",
  publisher: "Electra Weighing Systems",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Electra Weighing Systems (EWS)",
    title: "Electra Weighing Systems (EWS) | Industrial Weighing & Automation Solutions",
    description:
      "ISO 9001:2015 certified engineering pioneer in industrial weighing machines, digital strain gauge load cell technology, dynamic checkweighers, and custom SPM automation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Electra Weighing Systems (EWS) Industrial Machine Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Electra Weighing Systems (EWS) | Industrial Weighing & Automation",
    description:
      "High-accuracy industrial weighing machines, digital load cells, dynamic checkweighers, and SPM automation engineered for zero-error precision.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = getOrganizationJsonLd();
  const localBusinessJsonLd = getLocalBusinessJsonLd();
  const webSiteJsonLd = getWebSiteJsonLd();
  const faqJsonLd = getFaqJsonLd();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}


