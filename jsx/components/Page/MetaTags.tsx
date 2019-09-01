import React from 'react';
import { useRouter } from 'next/router';

import { OpenGraph } from './types';

const DEFAULT_IMAGE = '/static/og-image.png';

interface Props {
  og: OpenGraph;
  title: string;
  description?: string;
}

const MetaTags: React.FC<Props> = ({ og, title, description }) => {
  const router = useRouter();

  return (
    <React.Fragment>
      <title>{title}</title>
      <meta property="og:title" content={og ? og.title || title : title} />
      <meta
        property="og:image"
        content={og ? og.image || DEFAULT_IMAGE : DEFAULT_IMAGE}
      />
      <meta name="og:url" content={router.pathname} />
      <meta name="og:type" content="website" />
      {description ? (
        <React.Fragment>
          <meta property="og:description" content={description} />
          <meta name="description" content={description} />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default MetaTags;
