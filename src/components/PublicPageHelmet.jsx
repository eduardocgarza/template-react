import React from "react";
import { Helmet } from "react-helmet";

export default function PublicPageHelmet(props) {
  const { url, title, description, pageThumbnail } = props;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={pageThumbnail} />
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={pageThumbnail} />
    </Helmet>
  );
}
