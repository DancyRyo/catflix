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
    "name": "CatFlix Media Tracker",
    "alternateName": ["CatFlix", "黑猫影记", "Cat Media Tracker"],
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '',
    "description": "CatFlix - Professional media tracking tool for movies, anime, TV shows, books, and games. Track your progress, rate content, and create curated lists.",
    "sameAs": [
      // Add your social media links here
      // "https://twitter.com/catflix",
      // "https://facebook.com/catflix",
      // "https://github.com/catflix",
      // "https://instagram.com/catflix",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@catflix.site"
    }
  };

  return (
    <Script id="organization-schema" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// WebSite schema for better search appearance
export function WebSiteSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CatFlix Media Tracker",
    "alternateName": "CatFlix",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "description": "Track your movies, anime, TV shows, books, and games with CatFlix",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": typeof window !== 'undefined' ? `${window.location.origin}/search?q={search_term_string}` : ''
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["en", "zh", "ja", "ko"]
  };

  return (
    <Script id="website-schema" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// ItemList schema for category pages
export function ItemListSchema({ items, listName }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": item.name,
        "url": item.url,
        "image": item.image || undefined
      }
    }))
  };

  return (
    <Script id="itemlist-schema" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// Movie schema for movie pages
export function MovieSchema({ movie }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.name,
    "image": movie.image,
    "description": movie.description,
    "datePublished": movie.releaseDate,
    "genre": movie.genres,
    "director": movie.director ? {
      "@type": "Person",
      "name": movie.director
    } : undefined,
    "aggregateRating": movie.rating ? {
      "@type": "AggregateRating",
      "ratingValue": movie.rating,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined
  };

  return (
    <Script id="movie-schema" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// Book schema for book pages
export function BookSchema({ book }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.name,
    "author": book.author ? {
      "@type": "Person",
      "name": book.author
    } : undefined,
    "image": book.image,
    "description": book.description,
    "datePublished": book.publishDate,
    "isbn": book.isbn,
    "aggregateRating": book.rating ? {
      "@type": "AggregateRating",
      "ratingValue": book.rating,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined
  };

  return (
    <Script id="book-schema" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}

// VideoGame schema for game pages
export function VideoGameSchema({ game }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.name,
    "image": game.image,
    "description": game.description,
    "gamePlatform": game.platform,
    "genre": game.genres,
    "datePublished": game.releaseDate,
    "aggregateRating": game.rating ? {
      "@type": "AggregateRating",
      "ratingValue": game.rating,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined
  };

  return (
    <Script id="videogame-schema" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  );
}
