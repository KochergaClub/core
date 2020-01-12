import { useCallback } from 'react';

import { Row, Label } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';

import {
  PagedApolloCollection,
  CustomCardListView,
} from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import {
  useCm2CustomersQuery,
  useCm2CreateCustomerMutation,
  CustomerFragment,
} from '../queries.generated';

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
  const queryResults = useCm2CustomersQuery({
    variables: {
      first: 20,
    },
  });

  const [add] = useCm2CreateCustomerMutation({
    refetchQueries: ['Cm2Customers'],
    awaitRefetchQueries: true,
  });

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
      {({ data: { cm2Customers } }) => {
        return (
          <PagedApolloCollection
            connection={cm2Customers}
            fetchPage={queryResults.refetch}
            names={{
              plural: 'клиенты',
              genitive: 'клиента',
            }}
            add={{
              cb: async (data: FormData) => {
                await add({ variables: { params: data } });
              },
              shape: addShape,
            }}
            view={props => (
              <CustomCardListView {...props} renderItem={renderItem} />
            )}
          />
        );
      }}
    </ApolloQueryResults>
  );
};

export default CustomersScreen;
