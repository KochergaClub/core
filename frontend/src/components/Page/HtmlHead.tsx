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
  vkImage?: string;
}

const HtmlHead: React.FC<Props> = ({
  og,
  vkImage,
  title,
  description,
  canonicalUrl,
}) => {
  const router = useRouter();
  const ogUrl = canonicalUrl || router.asPath;

  return (
    <Head>
      {/* Note key="title" trick, this allows overriding title in nested components; see https://nextjs.org/docs/api-reference/next/head for details.
      For some reason overriding title works even without setting the correct `key`, but we don't want to rely on accidental undocumented features. */}
      <title key="title">{title}</title>
      <meta property="og:title" content={og ? og.title || title : title} />
      <meta
        property="og:image"
        content={og ? og.image || DEFAULT_IMAGE : DEFAULT_IMAGE}
      />
      {vkImage ? <meta property="vk:image" content={vkImage} /> : null}
      <meta name="og:url" content={ogUrl} />
      <meta name="og:type" content="website" />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {description ? (
        <>
          <meta property="og:description" content={description} />
          <meta name="description" content={description} />
        </>
      ) : null}
      <link rel="shortcut icon" href={staticUrl('favicon.ico')} />
    </Head>
  );
};

export default HtmlHead;
