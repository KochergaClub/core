import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { NextApolloPage, withApollo } from '~/apollo';
import { apolloClientForStaticProps } from '~/apollo/client';
import { KochergaApolloClient } from '~/apollo/types';

import FallbackPage from '../../components/FallbackPage';
import TildaPage from '../../components/TildaPage';
import { useWagtailPageReducer, WagtailPageContext } from '../../contexts';
import { TildaPageQuery } from '../../queries.generated';
import { loadTildaPage, tildaPageUrls } from '../../tilda-utils';
import { getComponentByTypename, loadWagtailPage, wagtailPageUrls } from '../../utils';

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

export const WagtailCmsPage: React.FC<{ page: any }> = ({ page }) => {
  // We need to have control over page because pages can be editable.
  // But this creates a problem: on navigation NextJS will replace the page prop and we need to handle it correctly.
  const [state, dispatch] = useWagtailPageReducer({
    page,
  });

  useEffect(() => {
    dispatch({
      type: 'NAVIGATE',
      payload: page,
    });
  }, [dispatch, page]);

  const typename = state.page.__typename;

  const Component = getComponentByTypename(typename);
  if (!Component) {
    // TODO - prettier error
    return <div>Внутренняя ошибка: страница неизвестного типа ${typename}</div>;
  }

  return (
    <WagtailPageContext.Provider value={{ state, dispatch }}>
      <Component page={state.page} />
    </WagtailPageContext.Provider>
  );
};

export const AnyCmsPage: NextApolloPage<Props> = (props) => {
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
      return <WagtailCmsPage page={props.page} />;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = await apolloClientForStaticProps();

  const tildaUrls = await tildaPageUrls(apolloClient);
  const wagtailUrls = await wagtailPageUrls(apolloClient);

  const urls = [...tildaUrls, ...wagtailUrls];

  const paths = urls
    .filter((u) => u !== '') // filter out front page - will be rendered from pages/index.tsx
    .filter((u) => !u.match(/^team($|\/)/)) // filter out team/ pages - can't be prerendered anyway
    .map((url) => ({
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

  const { page, typename } = await loadWagtailPage({
    locator: { path },
    apolloClient,
  });

  return {
    kind: 'wagtail',
    typename,
    page,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
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
    revalidate: 1,
  };
};

// FIXME - there's a weird typescript error which I don't know how to fix
export default withApollo(AnyCmsPage as any, { ssr: false });
