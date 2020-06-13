import { Props, AnyCmsPage, getCmsProps } from './AnyCmsPage';
import { NextApolloPage, withApollo } from '~/apollo';
import { normalizeSsrUrl } from '../utils';

const SsrCmsPage: NextApolloPage<Props> = props => AnyCmsPage(props);

SsrCmsPage.getInitialProps = async ctx => {
  if (!ctx.asPath) {
    throw new Error('asPath is empty');
  }

  const path = normalizeSsrUrl(ctx.asPath);

  const props = await getCmsProps(ctx.apolloClient, path);
  return {
    ...props,
    apolloState: ctx.apolloClient.cache.extract(),
  };
};

export default withApollo(SsrCmsPage);
