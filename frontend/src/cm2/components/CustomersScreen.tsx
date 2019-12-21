import { useCallback } from 'react';

import { Row, Label } from '@kocherga/frontkit';

import { Collection, CustomCardListView } from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import ApolloQueryResults from './ApolloQueryResults';

import {
  useCm2CustomersQuery,
  useCm2CreateCustomerMutation,
  CustomerFragment,
} from '../codegen';

import CustomerLink from './CustomerLink';

const CustomerCard: React.FC<{ customer: CustomerFragment }> = ({
  customer,
}) => {
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
  const queryResults = useCm2CustomersQuery();

  const [add] = useCm2CreateCustomerMutation();

  const renderItem = useCallback(
    (customer: CustomerFragment) => <CustomerCard customer={customer} />,
    []
  );

  interface FormData {
    card_id: number;
    first_name: string;
    last_name: string;
  }

  const addShape: FormShape = [
    {
      name: 'card_id',
      optional: false,
      title: 'Номер карты',
      type: 'number',
    },
    {
      name: 'first_name',
      optional: false,
      title: 'Имя',
      type: 'string',
    },
    {
      name: 'last_name',
      optional: false,
      title: 'Фамилия',
      type: 'string',
    },
  ];

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { cm2Customers } }) => (
        <Collection
          items={cm2Customers}
          names={{
            plural: 'клиенты',
            genitive: 'клиент',
          }}
          add={{
            cb: (data: FormData) => add({ variables: { params: data } }),
            shape: addShape,
          }}
          view={props => (
            <CustomCardListView {...props} renderItem={renderItem} />
          )}
        />
      )}
    </ApolloQueryResults>
  );
};

export default CustomersScreen;
