import { GetStaticProps, GetStaticPaths } from 'next';
import { withApollo, NextApolloPage } from '~/apollo';
import { apolloClientForStaticProps } from '~/apollo/client';

import { APIError } from '~/common/api';

import {
  PageLocator,
  loadTypename,
  getComponentByTypename,
  loadPageForComponent,
} from './utils';

import { loadTildaPage } from './tilda-utils';
import { Spinner } from '~/components';
import { useRouter } from 'next/router';
import { TildaPageQuery } from './queries.generated';
import TildaPage from './TildaPage';

interface WagtailProps {
  kind: 'wagtail';
  typename: string;
  page: any;
}

interface TildaProps {
  kind: 'tilda';
  data: TildaPageQuery['tildaPage'];
}

type Props = WagtailProps | TildaProps;

const AnyWagtailPage: NextApolloPage<Props> = props => {
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
    case 'wagtail':
      const Component = getComponentByTypename(props.typename);
      if (!Component) {
        return <div>oops</div>; // FIXME - better error
      }
      return <Component page={props.page} />;
    default:
      return <div>Unknown page kind: {props.kind}</div>;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async context => {
  const apolloClient = await apolloClientForStaticProps();

  const path = context.params
    ? (context.params.slug as string[]).join('/')
    : '';

  const tildaPage = await loadTildaPage({
    apolloClient,
    path,
  });

  if (tildaPage) {
    return {
      props: {
        kind: 'tilda',
        data: tildaPage,
        apolloState: apolloClient.cache.extract(),
      },
      unstable_revalidate: 1,
    };
  }

  const locator: PageLocator = { path };
  // FIXME - move to pages/preview.tsx
  // if (path === '/preview') {
  //   const preview_token = context.query.token as string;
  //   if (!preview_token) {
  //     throw new APIError('No token', 500);
  //   }
  //   locator = { preview_token };
  // }

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
    props: {
      kind: 'wagtail',
      typename,
      page,
      apolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
};

export default withApollo(AnyWagtailPage, { ssr: false });
