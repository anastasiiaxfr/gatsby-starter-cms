import React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";

export const SEO = ({ title, description, pathname, image, link, children }) => {
  const { title: defaultTitle, description: defaultDescription, siteUrl, twitterUsername } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image?.gatsbyImageData.images.sources[0].srcSet.split(",")[0].split(" ")[0] || "/seo/seo.jpg",
    url: `${siteUrl}${pathname || ""}`,
    link: link ? `${siteUrl}${link}` : "/",
    twitterUsername,
    author: "Anastasiia Berest",
  };
  return (
    <>
    
      {/* Title and Meta Tags */}
      <title>{`XFR.News | ${seo.title}`} </title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="author" content={seo.author} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
     
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="XFR.News" />
      <meta property="og:url" content={seo.url} />

      {/* Favicon and Icons */}
      <link rel="shortcut icon" href="/fav/favicon.png" type="image/x-icon" />
      <link rel="icon" href="/fav/favicon.png" type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="144x144" href="/fav/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png" />
      <link rel="mask-icon" href="/fav/safari-pinned-tab.svg" color="#fff" />

      {/* Manifest and Theme Color */}
      <link rel="manifest" href="/fav/site.webmanifest" />
      <link rel="mask-icon" href="/fav/safari-pinned-tab.svg" color="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      <meta name="theme-color" content="#dc2626" />

      {/* Canonical Link */}
      <link rel="canonical" href={seo.link} />

      <script async type="application/ld+json">
        {`
          {
            "@context": "http://schema.org/",
            "@type": "Organization",
            "name": "XFR.News",
            "brand": "XFR.News",
            "alternateName": "XFR.News",
            "url": "https://xforeal-news-md.vercel.app",
            "logo": "https://xforeal-news-md.vercel.app/seo/logo.svg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "вул. Василя Тютюнника 28А",
              "addressLocality": "Київ",
              "addressCountry": "Україна"
            },
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+380630633226",
              "email": "xfr.newse@gmail.com",
              "contactType": "customer support",
              "areaServed": "UA",
              "availableLanguage": ["Ukrainian"]
            }],
            "sameAs": [
              "https://www.facebook.com/",
              "https://www.instagram.com/",
              "https://www.tiktok.com/",
              "https://twitter.com/",
              "https://www.youtube.com/",
              "https://t.me/"
            ]
          }
        `}
      </script>

      {/* Children content passed to the SEO component */}
      {children}
    </>
  );
};
