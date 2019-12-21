import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';

import CmApp from '../components/CmApp';
import OrderDetailsScreen from '../components/OrderDetailsScreen';

interface Props {
  id: number;
}

const OrderPage: NextPage<Props> = ({ id }) => (
  <CmApp htmlTitle="Заказ #{id}">
    <OrderDetailsScreen id={id} />
  </CmApp>
);

OrderPage.getInitialProps = async ({ query }) => {
  const id = parseInt(query.id as string);
  return { id };
};

export default withApollo(OrderPage);
