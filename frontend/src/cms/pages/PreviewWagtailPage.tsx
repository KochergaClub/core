import { NextApolloPage, withApollo } from '~/apollo';
import { APIError } from '~/common/api';

import { WagtailPageContext } from '../contexts';
import {
    getComponentByTypename, KnownWagtailPageFragment, KnownWagtailPageTypename, loadWagtailPage,
    WagtailPageComponentsMap
} from '../wagtail-utils';

interface Props<T extends KnownWagtailPageTypename> {
  page: Parameters<WagtailPageComponentsMap[T]>[0]['page'];
}

const PreviewWagtailPage: NextApolloPage<{ page: KnownWagtailPageFragment }> = <
  T extends KnownWagtailPageTypename
>(
  props: Props<T>
) => {
  const typename = props.page.__typename as T;

  // FIXME - for some reason Component is incorrectly typed, don't know why
  const Component = getComponentByTypename(typename) as any;

  if (!Component) {
    return <div>oops</div>; // FIXME - better error
  }

  return (
    <WagtailPageContext.Provider
      value={{ state: { page: props.page, preview: true } }}
    >
      <Component page={props.page} />
    </WagtailPageContext.Provider>
  );
};

PreviewWagtailPage.getInitialProps = async ({ query, apolloClient }) => {
  const preview_token = query.token as string;
  if (!preview_token) {
    throw new APIError('No token', 404);
  }
  const maybePage = await loadWagtailPage({
    locator: { preview_token },
    apolloClient,
  });

  switch (maybePage.kind) {
    case 'ok':
      return {
        page: maybePage.page,
      };
    case 'private':
      throw new APIError('Private', 500); // don't expect preview pages to be private
  }
};

export default withApollo(PreviewWagtailPage);
