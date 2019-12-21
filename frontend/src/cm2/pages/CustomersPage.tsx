import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';

import CmApp from '../components/CmApp';
import CustomersScreen from '../components/CustomersScreen';

const CustomersPage: NextPage = () => (
  <CmApp htmlTitle="Клиенты">
    <CustomersScreen />
  </CmApp>
);

export default withApollo(CustomersPage);
