import { NextPage } from '~/common/types';
import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import CmApp from '../components/CmApp';
import CustomerDetailsScreen from '../components/CustomerDetailsScreen';

interface Props {
  id: string;
}

const CustomerDetailsPage: NextPage<Props> = ({ id }) => (
  <CmApp htmlTitle="Клиент #{id}">
    <CustomerDetailsScreen id={id} />
  </CmApp>
);

CustomerDetailsPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  return { id };
};

export default withApollo(withStaff(CustomerDetailsPage));
