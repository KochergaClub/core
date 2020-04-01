import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import CmApp from '../components/CmApp';
import CustomerDetailsScreen from '../components/CustomerDetailsScreen';

interface Props {
  id: string;
}

const CustomerDetailsPage: NextApolloPage<Props> = ({ id }) => (
  <CmApp htmlTitle="Клиент #{id}">
    <CustomerDetailsScreen id={id} />
  </CmApp>
);

CustomerDetailsPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  return { id };
};

export default withApollo(withStaff(CustomerDetailsPage));
