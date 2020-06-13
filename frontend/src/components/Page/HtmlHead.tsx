import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { staticUrl } from '~/common/utils';

import { OpenGraph } from './types';

const DEFAULT_IMAGE = staticUrl('og-image.png');

interface Props {
  og: OpenGraph;
  title: string;
  description?: string;
  canonicalUrl?: string;
}

const HtmlHead: React.FC<Props> = ({
  og,
  title,
  description,
  canonicalUrl,
}) => {
  const router = useRouter();
  const ogUrl = canonicalUrl || router.asPath;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={og ? og.title || title : title} />
      <meta
        property="og:image"
        content={og ? og.image || DEFAULT_IMAGE : DEFAULT_IMAGE}
      />
      <meta name="og:url" content={ogUrl} />
      <meta name="og:type" content="website" />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {description ? (
        <React.Fragment>
          <meta property="og:description" content={description} />
          <meta name="description" content={description} />
        </React.Fragment>
      ) : null}
      <link rel="shortcut icon" href={staticUrl('favicon.ico')} />
    </Head>
  );
};

export default HtmlHead;
