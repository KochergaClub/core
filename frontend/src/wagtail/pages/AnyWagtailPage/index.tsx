import { withApollo } from '~/apollo/client';
import { NextApolloPage } from '~/apollo/types';

import { APIError } from '~/common/api';

import {
  PageLocator,
  loadTypename,
  getComponentByTypename,
  loadPageForComponent,
} from './utils';

interface Props {
  typename: string;
  page: any;
}

const AnyWagtailPage: NextApolloPage<Props> = ({ typename, page }) => {
  const Component = getComponentByTypename(typename);

  if (!Component) {
    return <div>oops</div>;
  }

  return <Component page={page} />;
};

AnyWagtailPage.getInitialProps = async context => {
  const { apolloClient } = context;

  if (!context.asPath) {
    throw new Error('asPath is empty');
  }

  const path = decodeURI(context.asPath.split('?')[0]);

  let locator: PageLocator = { path };
  if (path === '/preview') {
    const preview_token = context.query.token as string;
    if (!preview_token) {
      throw new APIError('No token', 500);
    }
    locator = { preview_token };
  }

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

  return { typename, page };
};

export default withApollo(AnyWagtailPage);
