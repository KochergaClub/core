import { withApollo, NextApolloPage } from '~/apollo';
import { APIError } from '~/common/api';
import { loadWagtailPage, getComponentByTypename } from '../utils';

interface Props {
  typename: string;
  page: any;
}

const PreviewWagtailPage: NextApolloPage<Props> = (props) => {
  const Component = getComponentByTypename(props.typename);
  if (!Component) {
    return <div>oops</div>; // FIXME - better error
  }
  return <Component page={props.page} />;
};

PreviewWagtailPage.getInitialProps = async ({ query, apolloClient }) => {
  const preview_token = query.token as string;
  if (!preview_token) {
    throw new APIError('No token', 500);
  }
  const { page, typename } = await loadWagtailPage({
    locator: { preview_token },
    apolloClient,
  });

  return {
    typename,
    page,
  };
};

export default withApollo(PreviewWagtailPage);
