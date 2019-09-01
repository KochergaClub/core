import React from 'react';

import { OpenGraph } from './types';

const DEFAULT_IMAGE = '/static/og-image.png';

interface Props {
  og: OpenGraph;
  title: string;
  description?: string;
}

const MetaTags: React.FC<Props> = ({ og, title, description }) => (
  <React.Fragment>
    <title>{title}</title>
    <meta property="og:title" content={og ? og.title || title : title} />
    <meta
      property="og:image"
      content={og ? og.image || DEFAULT_IMAGE : DEFAULT_IMAGE}
    />
    {description ? (
      <React.Fragment>
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
      </React.Fragment>
    ) : null}
  </React.Fragment>
);

export default MetaTags;
