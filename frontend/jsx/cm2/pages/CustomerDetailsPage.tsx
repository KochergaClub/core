import { NextPage } from '~/common/types';

import { viewCustomerDetails } from '../features/view';

import CmApp from '../components/CmApp';

const OrderPage: NextPage = () => <CmApp />;

OrderPage.getInitialProps = async ({ store: { dispatch }, query }) => {
  const customer_id = parseInt(query.id as string);
  await dispatch(viewCustomerDetails(customer_id));
  return {};
};

export default OrderPage;
