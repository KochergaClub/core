import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';

import CmApp from '../components/CmApp';
import CustomerDetailsScreen from '../components/CustomerDetailsScreen';

interface Props {
  id: number;
}

const CustomerDetailsPage: NextPage<Props> = ({ id }) => (
  <CmApp htmlTitle="Клиент #{id}">
    <CustomerDetailsScreen id={id} />
  </CmApp>
);

CustomerDetailsPage.getInitialProps = async ({ query }) => {
  const id = parseInt(query.id as string);
  return { id };
};

export default withApollo(CustomerDetailsPage);
