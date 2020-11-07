import { parseISO } from 'date-fns';
import { useCallback } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { formatDate } from '~/common/utils';
import { ApolloQueryResults } from '~/components';
import { AsyncButton, Column, Label } from '~/frontkit';

import { Cm2CloseOrderDocument, Cm2OrderDocument } from '../queries.generated';
import CustomerLink from './CustomerLink';

interface Props {
  id: string;
}

export const OrderDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useQuery(Cm2OrderDocument, { variables: { id } });

  const [closeMutation] = useMutation(Cm2CloseOrderDocument, {
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
            <div>{formatDate(parseISO(order.start), 'yyyy-MM-dd HH:mm')}</div>
          </div>
          {order.end && (
            <div>
              <Label>Закрыт</Label>
              <div>{formatDate(parseISO(order.end), 'yyyy-MM-dd HH:mm')}</div>
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
