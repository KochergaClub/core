import { useCallback } from 'react';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Row, Label } from '@kocherga/frontkit';

import { Collection, CustomCardListView } from '~/components/collections';

import { Customer } from '../types';

import shapes from '../../shapes';

import CustomerLink from './CustomerLink';

const GET_CUSTOMERS = gql`
  query {
    cm2Customers {
      id
      first_name
      last_name
      card_id
    }
  }
`;

const CREATE_CUSTOMER = gql`
  mutation Cm2CreateCustomer($params: Cm2CreateCustomerInput!) {
    cm2CreateCustomer(params: $params) {
      id
    }
  }
`;

const CustomerCard: React.FC<{ customer: Customer }> = ({ customer }) => {
  return (
    <div>
      <Row vCentered>
        <Label>Карта:</Label>
        <div>{customer.card_id}</div>
      </Row>
      <CustomerLink customer={customer} />
    </div>
  );
};

const CustomersScreen: React.FC = () => {
  const { data } = useQuery(GET_CUSTOMERS);

  const [add] = useMutation(CREATE_CUSTOMER);

  const renderItem = useCallback(
    (customer: Customer) => <CustomerCard customer={customer} />,
    []
  );

  if (!data) {
    return null; // FIXME
  }

  const items = data.cm2Customers as Customer[];

  return (
    <Collection
      items={items}
      names={{
        plural: 'клиенты',
        genitive: 'клиент',
      }}
      add={{
        cb: data => add({ variables: { params: data } }),
        shape: shapes.cm2.customer,
      }}
      view={props => <CustomCardListView {...props} renderItem={renderItem} />}
    />
  );
};

export default CustomersScreen;
