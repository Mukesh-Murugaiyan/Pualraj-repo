import { Product } from './products';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.electrasystems24.com';

export const COMPANY_DETAILS = {
  legalName: 'Electra Weighing Systems',
  shortName: 'EWS',
  tagline: 'Industrial Weighing & SPM Automation Solutions',
  certification: 'ISO 9001:2015 Certified',
  address: {
    streetAddress: 'NO.75 GNT Road, Thatchur Cross Road, Panjetty Post',
    addressLocality: 'Ponneri',
    addressRegion: 'Tamil Nadu',
    postalCode: '601204',
    addressCountry: 'IN',
    fullText: 'NO.75 GNT Road, Thatchur Cross Road, Panjetty Post, Ponneri (TK), Thiruvallur Dist-601 204, Tamil Nadu, India',
  },
  geo: {
    latitude: '13.3195',
    longitude: '80.1462',
  },
  contact: {
    salesPhone: '+91 9566962031',
    altPhone: '+91 9943182031',
    techPhone: '+91 6361763911',
    email: 'ews@electrasystems24.com',
  },
};

export const FOUNDERS = [
  {
    name: 'Paulraj.S',
    jobTitle: 'Founder & Managing Director',
    role: 'Managing Director',
    phones: ['+91 9566962031', '+91 9943182031'],
    email: 'ews@electrasystems24.com',
    bio: 'Pioneer in heavy industrial weighing automation, strain-gauge sensor technology, and custom SPM machinery design with over 15+ years of engineering leadership.',
    knowsAbout: [
      'Industrial Weighing Systems',
      'Strain Gauge Load Cells',
      'Digital Transducers',
      'SPM Automation',
      'PLC & SCADA Integration',
    ],
  },
  {
    name: 'Silambarasan.R',
    jobTitle: 'Director & Technical Co-Founder',
    role: 'Technical Director',
    phones: ['+91 6361763911'],
    email: 'ews@electrasystems24.com',
    bio: 'Specialist in high-speed dynamic checkweighing, Industry 4.0 telemetry systems, precision calibration, and automated process batching.',
    knowsAbout: [
      'Dynamic Checkweighers',
      'Loss-in-Weight Batching',
      'Industry 4.0 Telemetry',
      'OIML Calibration Standards',
      'Sensors & Motion Control',
    ],
  },
];

export function getSiteUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_DETAILS.legalName,
    alternateName: COMPANY_DETAILS.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'ISO 9001:2015 certified engineering leader in heavy industrial weighing machines, strain-gauge load cells, dynamic checkweighers, hopper batching rigs, and SPM automation.',
    email: COMPANY_DETAILS.contact.email,
    telephone: COMPANY_DETAILS.contact.salesPhone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_DETAILS.address.streetAddress,
      addressLocality: COMPANY_DETAILS.address.addressLocality,
      addressRegion: COMPANY_DETAILS.address.addressRegion,
      postalCode: COMPANY_DETAILS.address.postalCode,
      addressCountry: COMPANY_DETAILS.address.addressCountry,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_DETAILS.contact.salesPhone,
        contactType: 'sales & technical support',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_DETAILS.contact.techPhone,
        contactType: 'technical direction',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
    ],
    founder: FOUNDERS.map((founder) => ({
      '@type': 'Person',
      name: founder.name,
      jobTitle: founder.jobTitle,
      email: founder.email,
    })),
  };
}

export function getLocalBusinessJsonLd() {
  const mapUrl = 'https://maps.google.com/maps?q=NO.75+GNT+Road,+Thatchur+Cross+Road,+Panjetty+Post,+Ponneri+TK,+Thiruvallur+Dist+601204';

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'IndustrialBusiness'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: `${COMPANY_DETAILS.legalName} (${COMPANY_DETAILS.shortName})`,
    url: SITE_URL,
    telephone: COMPANY_DETAILS.contact.salesPhone,
    email: COMPANY_DETAILS.contact.email,
    priceRange: '₹₹₹',
    hasMap: mapUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_DETAILS.address.streetAddress,
      addressLocality: COMPANY_DETAILS.address.addressLocality,
      addressRegion: COMPANY_DETAILS.address.addressRegion,
      postalCode: COMPANY_DETAILS.address.postalCode,
      addressCountry: COMPANY_DETAILS.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_DETAILS.geo.latitude,
      longitude: COMPANY_DETAILS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
  };
}


export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Electra Weighing Systems (EWS)',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of industrial weighing machines does Electra Weighing Systems (EWS) manufacture?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Electra Weighing Systems (EWS) manufactures high-accuracy strain gauge load cell systems, dynamic inline checkweighers, Loss-in-Weight hopper batching rigs, silo weighing automation, and custom Special Purpose Machines (SPM).',
        },
      },
      {
        '@type': 'Question',
        name: 'Are EWS weighing machines legal-for-trade certified?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, EWS machines are designed compliant with OIML R60 / R76 Class III & C3/C6 precision standards, suitable for pharmaceutical, chemical, and commercial trade applications.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who are the founders of Electra Weighing Systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Electra Weighing Systems was founded by Paulraj.S (Managing Director) and Silambarasan.R (Technical Director), pioneers in industrial weighing automation and SPM engineering.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is the EWS factory and headquarters located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EWS headquarters and manufacturing plant are located at NO.75 GNT Road, Thatchur Cross Road, Panjetty Post, Ponneri (TK), Thiruvallur Dist - 601 204, Tamil Nadu, India.',
        },
      },
    ],
  };
}

export function getProductJsonLd(product: Product) {
  const productUrl = getSiteUrl(`/products/${product.id}`);

  const specsArray = product.specs
    ? Object.entries(product.specs).map(([key, value]) => ({
      '@type': 'PropertyValue',
      name: key,
      value: String(value),
    }))
    : [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': productUrl,
    name: product.title,
    description: product.desc || product.fullDescription,
    category: product.category,
    image: product.image ? (product.image.startsWith('http') ? product.image : getSiteUrl(product.image)) : undefined,
    url: productUrl,
    brand: {
      '@type': 'Brand',
      name: 'Electra Weighing Systems (EWS)',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Electra Weighing Systems (EWS)',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Electra Weighing Systems',
      },
    },
    additionalProperty: specsArray,
  };
}

export function getProductsItemListJsonLd(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.title,
      url: getSiteUrl(`/products/${product.id}`),
    })),
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.url),
    })),
  };
}

export function getFoundersJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': FOUNDERS.map((founder) => ({
      '@type': 'Person',
      '@id': `${SITE_URL}/founders/#${founder.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      name: founder.name,
      jobTitle: founder.jobTitle,
      description: founder.bio,
      worksFor: {
        '@type': 'Organization',
        name: 'Electra Weighing Systems (EWS)',
        url: SITE_URL,
      },
      knowsAbout: founder.knowsAbout,
      email: founder.email,
    })),
  };
}
