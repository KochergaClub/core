import { useCallback } from 'react';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Column, Label } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import { formatDate } from '~/common/utils';

import CustomerLink from './CustomerLink';

interface Props {
  id: number;
}

const GET_ORDER = gql`
  query Cm2Order($id: ID!) {
    cm2Order(id: $id) {
      id
      start
      end
      value
      customer {
        id
        first_name
        last_name
        card_id
      }
    }
  }
`;

const CLOSE_ORDER = gql`
  mutation Cm2CloseOrder($id: ID!) {
    cm2CloseOrder(id: $id)
  }
`;

export const OrderDetailsScreen: React.FC<Props> = ({ id }) => {
  const { loading, error, data, refetch } = useQuery(GET_ORDER, {
    variables: { id },
  });

  const [closeMutation] = useMutation(CLOSE_ORDER);

  const close = useCallback(async () => {
    await closeMutation({ variables: { id } });
    await refetch();
  }, [closeMutation, id]);

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null; // FIXME
  }

  const order = data.cm2Order;

  return (
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
  );
};

export default OrderDetailsScreen;
