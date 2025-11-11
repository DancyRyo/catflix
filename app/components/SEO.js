'use client';

import Script from 'next/script';

export default function SEO({
  title,
  description,
  type = 'website',
  image,
  keywords = [],
  structuredData
}) {
  return (
    <>
      {structuredData && (
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify(structuredData)}
        </Script>
      )}
    </>
  );
}

// Breadcrumb component for SEO
export function BreadcrumbList({ items }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script id="breadcrumb-schema" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// FAQ component for SEO
export function FAQSchema({ faqs }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script id="faq-schema" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// Organization schema
export function OrganizationSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "黑猫影记 CatFlix",
    "alternateName": ["CatFlix", "黑猫影记", "Cat Media Tracker"],
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '',
    "description": "黑猫影记 CatFlix - 专业的媒体追踪工具，帮助你记录和管理观看过的电影、日本动漫、电视剧、韩剧、日剧、书籍和游戏。",
    "sameAs": [
      // Add your social media links here
      // "https://twitter.com/catflix",
      // "https://facebook.com/catflix",
    ]
  };

  return (
    <Script id="organization-schema" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}
