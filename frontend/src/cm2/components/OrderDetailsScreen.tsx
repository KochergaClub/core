import { useCallback } from 'react';

import { Column, Label } from '@kocherga/frontkit';

import { ApolloQueryResults, AsyncButton } from '~/components';
import { formatDate } from '~/common/utils';

import {
  useCm2OrderQuery,
  Cm2OrderDocument,
  useCm2CloseOrderMutation,
} from '../queries.generated';

import CustomerLink from './CustomerLink';

interface Props {
  id: string;
}

export const OrderDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useCm2OrderQuery({ variables: { id } });

  const [closeMutation] = useCm2CloseOrderMutation({
    refetchQueries: [
      {
        query: Cm2OrderDocument,
        variables: { id },
      },
    ],
    awaitRefetchQueries: true,
  });

  const close = useCallback(async () => {
    await closeMutation({ variables: { id } });
  }, [closeMutation, id]);

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { cm2Order: order } }) => (
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
