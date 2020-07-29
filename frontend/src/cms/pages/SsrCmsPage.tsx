import { Props, AnyCmsPage, getCmsProps } from './AnyCmsPage';
import { NextApolloPage, withApollo } from '~/apollo';
import { normalizeSsrPath } from '../utils';

const SsrCmsPage: NextApolloPage<Props> = (props) => <AnyCmsPage {...props} />;

SsrCmsPage.getInitialProps = async (ctx) => {
  if (!ctx.asPath) {
    throw new Error('asPath is empty');
  }

  const path = normalizeSsrPath(ctx.asPath);

  const props = await getCmsProps(ctx.apolloClient, path);
  return {
    ...props,
    apolloState: ctx.apolloClient.cache.extract(),
  };
};

// FIXME - there's a weird typescript error which I don't know how to fix
export default withApollo(SsrCmsPage as any);
