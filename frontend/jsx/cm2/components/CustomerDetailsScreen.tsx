import { useSelector } from 'react-redux';

import { selectCustomerDetails } from '../features/customerDetails';

const CustomerDetailsScreen: React.FC = () => {
  const customer = useSelector(selectCustomerDetails);

  if (!customer) {
    throw new Error('Customer is not loaded');
  }

  return (
    <h2>
      {customer.first_name} {customer.last_name}
    </h2>
  );
};

export default CustomerDetailsScreen;
