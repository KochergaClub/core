import { useCallback } from 'react';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Column, Label } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import { formatDate } from '~/common/utils';

import { useOrderQuery } from '../hooks';

import CustomerLink from './CustomerLink';
import ApolloQueryResults from './ApolloQueryResults';

interface Props {
  id: number;
}

const CLOSE_ORDER = gql`
  mutation Cm2CloseOrder($id: ID!) {
    cm2CloseOrder(id: $id)
  }
`;

export const OrderDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useOrderQuery({ id });

  const [closeMutation] = useMutation(CLOSE_ORDER);

  const close = useCallback(async () => {
    await closeMutation({ variables: { id } });
    await queryResults.refetch();
  }, [closeMutation, id, queryResults.refetch]);

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { cm2Order: order }, loading }) => (
        <Column>
          <h2>Заказ №{order.id}</h2>
          <div>
            <Label>Открыт</Label>
            <div>{formatDate(new Date(order.start), 'yyyy-MM-dd HH:mm')}</div>
          </div>
          {order.end && (
            <div>
              <Label>Закрыт</Label>
              <div>{formatDate(new Date(order.end), 'yyyy-MM-dd HH:mm')}</div>
            </div>
          )}
          {order.value && (
            <div>
              <Label>Стоимость</Label>
              <div>{order.value} руб.</div>
            </div>
          )}
          {order.customer ? (
            <div>
              <Label>Клиент</Label>
              <div>
                <CustomerLink customer={order.customer} />
              </div>
            </div>
          ) : null}
          {order.end ? null : (
            <div>
              <AsyncButton act={close}>Закрыть</AsyncButton>
            </div>
          )}
        </Column>
      )}
    </ApolloQueryResults>
  );
};

export default OrderDetailsScreen;
