import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';

import CmApp from '../components/CmApp';
import OpenOrdersScreen from '../components/OpenOrdersScreen';

const IndexPage: NextPage = () => (
  <CmApp htmlTitle="Открытые заказы">
    <OpenOrdersScreen />
  </CmApp>
);

export default withApollo(IndexPage);
