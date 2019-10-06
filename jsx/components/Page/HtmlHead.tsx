import React from 'react';
import Head from 'next/head';

import { OpenGraph } from './types';

const DEFAULT_IMAGE = '/static/og-image.png';

interface Props {
  og: OpenGraph;
  title: string;
  description?: string;
  url: string;
}

const MetaTags: React.FC<Props> = ({ og, title, description, url }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={og ? og.title || title : title} />
      <meta
        property="og:image"
        content={og ? og.image || DEFAULT_IMAGE : DEFAULT_IMAGE}
      />
      <meta name="og:url" content={url} />
      <meta name="og:type" content="website" />
      {description ? (
        <React.Fragment>
          <meta property="og:description" content={description} />
          <meta name="description" content={description} />
        </React.Fragment>
      ) : null}
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>
  );
};

export default MetaTags;