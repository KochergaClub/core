import { NextPage } from '~/common/types';
import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import CmApp from '../components/CmApp';
import OrderDetailsScreen from '../components/OrderDetailsScreen';

interface Props {
  id: string;
}

const OrderPage: NextPage<Props> = ({ id }) => (
  <CmApp htmlTitle="Заказ #{id}">
    <OrderDetailsScreen id={id} />
  </CmApp>
);

OrderPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  return { id };
};

export default withApollo(withStaff(OrderPage));
