import { NextPage } from '~/common/types';

import { viewDetails } from '../features/view';

import CmApp from '../components/CmApp';

const OrderPage: NextPage = () => <CmApp />;

OrderPage.getInitialProps = async ({ store: { dispatch }, query }) => {
  const order_id = parseInt(query.id as string);
  await dispatch(viewDetails(order_id));
  return {};
};

export default OrderPage;
