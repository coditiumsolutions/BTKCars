import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  type = 'website',
  image = 'https://btkcars.com/logo_bakcars.jpg'
}) => {
  const siteUrl = 'https://btkcars.com';
  const fullTitle = title ? `${title} | BTK Cars` : 'BTK Cars - Premium Car Dealership in Bahria Town Karachi';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="BTK Cars" />
      <meta property="og:locale" content="en_PK" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="PK-SD" />
      <meta name="geo.placename" content="Bahria Town Karachi" />
      <meta name="geo.position" content="24.9211;67.1848" />
      <meta name="ICBM" content="24.9211, 67.1848" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="BTK Cars" />
    </Helmet>
  );
};

export default SEO;
