import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Column, Label } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import { formatDate } from '~/common/utils';
import { useDispatch } from '~/common/hooks';

import { selectOrderDetails } from '../features/orderDetails';
import { closeOrder } from '../features/orderActions';

import CustomerLink from './CustomerLink';

export const OrderDetails: React.FC = () => {
  const { order, customer } = useSelector(selectOrderDetails);
  const dispatch = useDispatch();

  const close = useCallback(async () => {
    await dispatch(closeOrder(order.id));
  }, [dispatch, order.id]);

  return (
    <Column>
      <h2>Заказ №{order.id}</h2>
      <div>
        <Label>Открыт</Label>
        <div>{formatDate(order.start, 'yyyy-MM-dd HH:mm')}</div>
      </div>
      {order.end && (
        <div>
          <Label>Закрыт</Label>
          <div>{formatDate(order.end, 'yyyy-MM-dd HH:mm')}</div>
        </div>
      )}
      {order.value && (
        <div>
          <Label>Стоимость</Label>
          <div>{order.value} руб.</div>
        </div>
      )}
      {customer ? (
        <div>
          <Label>Клиент</Label>
          <div>
            <CustomerLink customer={customer} />
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

export default OrderDetails;
