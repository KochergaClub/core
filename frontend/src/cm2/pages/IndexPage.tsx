import { NextPage } from '~/common/types';

import { viewOpen } from '../features/view';

import CmApp from '../components/CmApp';

const IndexPage: NextPage = () => <CmApp />;

IndexPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(viewOpen());
  return {};
};

export default IndexPage;
