import { useSelector } from 'react-redux';

import { Row, Label } from '@kocherga/frontkit';

import { selectCustomerDetails } from '../features/customerDetails';

const CustomerDetailsScreen: React.FC = () => {
  const customer = useSelector(selectCustomerDetails);

  if (!customer) {
    throw new Error('Customer is not loaded');
  }

  return (
    <div>
      <h2>
        {customer.first_name} {customer.last_name}
      </h2>
      <Row vCentered>
        <Label>Карта:</Label>
        <div>{customer.card_id}</div>
      </Row>
    </div>
  );
};

export default CustomerDetailsScreen;
