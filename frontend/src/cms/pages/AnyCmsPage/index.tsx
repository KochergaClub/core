import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { withApollo, NextApolloPage } from '~/apollo';
import { apolloClientForStaticProps } from '~/apollo/client';
import { KochergaApolloClient } from '~/apollo/types';

import { APIError } from '~/common/api';

import {
  PageLocator,
  loadTypename,
  getComponentByTypename,
  loadPageForComponent,
  wagtailPageUrls,
} from '../../utils';
import { loadTildaPage, tildaPageUrls } from '../../tilda-utils';

import { TildaPageQuery } from '../../queries.generated';
import TildaPage from '../../components/TildaPage';
import FallbackPage from '../../components/FallbackPage';

interface WagtailProps {
  kind: 'wagtail';
  typename: string;
  page: any;
}

interface TildaProps {
  kind: 'tilda';
  data: TildaPageQuery['tildaPage'];
}

export type Props = WagtailProps | TildaProps;

export const AnyCmsPage: NextApolloPage<Props> = props => {
  const router = useRouter();
  if (router.isFallback) {
    return <FallbackPage />;
  }

  switch (props.kind) {
    case 'tilda':
      if (!props.data) {
        throw new Error('oops');
      }
      return <TildaPage {...props.data} />;
    case 'wagtail':
      const Component = getComponentByTypename(props.typename);
      if (!Component) {
        return <div>oops</div>; // FIXME - better error
      }
      return <Component page={props.page} />;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = await apolloClientForStaticProps();

  const tildaUrls = await tildaPageUrls(apolloClient);
  const wagtailUrls = await wagtailPageUrls(apolloClient);

  const urls = [...tildaUrls, ...wagtailUrls];

  const paths = urls
    .filter(u => u !== '') // filter out front page - will be rendered from pages/index.tsx
    .filter(u => !u.startsWith('team/')) // filter out team/ pages - can't be prerendered anyway
    .map(url => ({
      params: {
        slug: url.split('/'),
      },
    }));

  return {
    paths,
    fallback: true,
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

  const locator: PageLocator = { path };

  const typename = await loadTypename({
    apolloClient,
    locator,
  });
  const component = getComponentByTypename(typename);

  if (!component) {
    throw new APIError('Unknown typename', 500);
  }

  const page = await loadPageForComponent({
    component,
    typename,
    apolloClient,
    locator,
  });

  return {
    kind: 'wagtail',
    typename,
    page,
  };
};

export const getStaticProps: GetStaticProps<Props> = async context => {
  const apolloClient = await apolloClientForStaticProps();

  const path = context.params
    ? (context.params.slug as string[]).join('/')
    : '';

  const props = await getCmsProps(apolloClient, path);

  return {
    props: {
      ...props,
      apolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };

  // FIXME - move to pages/preview.tsx
  // if (path === '/preview') {
  //   const preview_token = context.query.token as string;
  //   if (!preview_token) {
  //     throw new APIError('No token', 500);
  //   }
  //   locator = { preview_token };
  // }
};

export default withApollo(AnyCmsPage, { ssr: false });
