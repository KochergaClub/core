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

interface Props {
  typename: string;
  page: any;
}

const AnyWagtailPage: NextApolloPage<Props> = ({ typename, page }) => {
  const Component = getComponentByTypename(typename);

  if (!Component) {
    return <Spinner size="block" />;
  }

  return <Component page={page} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const apolloClient = await apolloClientForStaticProps();

  if (!context.params) {
    throw new Error('params are empty');
  }

  const path = (context.params.slug as string[]).join('/');

  // FIXME!
  // const tildaPage = await loadTildaPage({
  //   apolloClient,
  //   path,
  // });
  // if (tildaPage) {
  //   if (!res) {
  //     throw new Error("Can't render Tilda pages on client-side navigation");
  //     // FIXME - just reload the page from server
  //   }
  //   res.writeHead(200, {
  //     'Content-Type': 'text/html',
  //   });
  //   res.write(tildaPage);
  //   res.end();
  //   return { typename: '', page: '' };
  // }

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
      typename,
      page,
    },
    unstable_revalidate: 1,
  };
};

export default withApollo(AnyWagtailPage, { ssr: false });
