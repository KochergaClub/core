import { useCallback } from 'react';

import { Column, Label } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import { formatDate } from '~/common/utils';

import { useCm2OrderQuery, useCm2CloseOrderMutation } from '../codegen';

import CustomerLink from './CustomerLink';
import ApolloQueryResults from './ApolloQueryResults';

interface Props {
  id: string;
}

export const OrderDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useCm2OrderQuery({ variables: { id } });

  const [closeMutation] = useCm2CloseOrderMutation();

  const close = useCallback(async () => {
    await closeMutation({ variables: { id } });
    await queryResults.refetch();
  }, [closeMutation, id, queryResults.refetch]);

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
