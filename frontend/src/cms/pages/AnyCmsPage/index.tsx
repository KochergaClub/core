import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { NextApolloPage, withApollo } from '~/apollo';
import { apolloClientForDataFetching } from '~/apollo/client';
import { KochergaApolloClient } from '~/apollo/types';
import { APIError } from '~/common/api';
import { Spinner } from '~/components';

import TildaPage from '../../components/TildaPage';
import { TildaPageQuery } from '../../queries.generated';
import { loadTildaPage } from '../../tilda-utils';
import { KnownWagtailPageFragment, loadWagtailPage } from '../../wagtail-utils';
import PrivateWagtailCmsPage from './PrivateWagtailCmsPage';
import WagtailCmsPage from './WagtailCmsPage';

interface WagtailProps {
  kind: 'wagtail';
  page: KnownWagtailPageFragment;
}

interface PrivateWagtailProps {
  kind: 'private-wagtail';
}

interface TildaProps {
  kind: 'tilda';
  data: TildaPageQuery['tildaPage'];
}

export type Props = WagtailProps | PrivateWagtailProps | TildaProps;

export const AnyCmsPage: NextApolloPage<Props> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Spinner size="block" />;
  }

  switch (props.kind) {
    case 'tilda':
      if (!props.data) {
        throw new Error('oops');
      }
      return <TildaPage {...props.data} />;
    case 'private-wagtail':
      return <PrivateWagtailCmsPage />;
    case 'wagtail':
      return <WagtailCmsPage page={props.page} />;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const apolloClient = await apolloClientForDataFetching();

  // const tildaUrls = await tildaPageUrls(apolloClient);
  // const wagtailUrls = await wagtailPageUrls(apolloClient);

  // const urls = [...tildaUrls, ...wagtailUrls];

  // const paths = urls
  //   .filter((u) => u !== '') // filter out front page - will be rendered from pages/index.tsx
  //   .filter((u) => !u.match(/^team($|\/)/)) // filter out team/ pages - can't be prerendered anyway
  //   .map((url) => ({
  //     params: {
  //       slug: url.split('/'),
  //     },
  //   }));

  const paths: string[] = [];

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getCmsProps = async (
  apolloClient: KochergaApolloClient,
  path: string
): Promise<Props> => {
  const tildaPage = await loadTildaPage({
    apolloClient,
    path,
  });

  if (tildaPage) {
    return {
      kind: 'tilda',
      data: tildaPage,
    };
  }

  const maybePage = await loadWagtailPage({
    locator: { path },
    apolloClient,
  });

  switch (maybePage.kind) {
    case 'ok':
      return {
        kind: 'wagtail',
        page: maybePage.page,
      };
    case 'private':
      return {
        kind: 'private-wagtail',
      };
  }
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const apolloClient = await apolloClientForDataFetching();

  const path = context.params
    ? ((context.params.slug || []) as string[]).join('/')
    : '';

  try {
    const props = await getCmsProps(apolloClient, path);

    return {
      props: {
        ...props,
        apolloState: apolloClient.cache.extract(),
      },
      revalidate: 1,
    };
  } catch (e) {
    if (e instanceof APIError && e.status === 404) {
      return {
        notFound: true,
        revalidate: 1,
      };
    }
    throw e;
  }
};

// FIXME - there's a weird typescript error which I don't know how to fix
export default withApollo(AnyCmsPage as any, { ssr: false });
