import { NextPage } from '~/common/types';

import { viewCustomers } from '../features/view';

import CmApp from '../components/CmApp';

const ClosedOrdersPage: NextPage = () => <CmApp />;

ClosedOrdersPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(viewCustomers());
  return {};
};

export default ClosedOrdersPage;
