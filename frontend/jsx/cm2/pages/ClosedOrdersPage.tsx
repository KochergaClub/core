import { NextPage } from '~/common/types';

import { viewClosed } from '../features/view';

import CmApp from '../components/CmApp';

const ClosedOrdersPage: NextPage = () => <CmApp />;

ClosedOrdersPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(viewClosed());
  return {};
};

export default ClosedOrdersPage;
