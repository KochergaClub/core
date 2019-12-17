import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Column, Label } from '@kocherga/frontkit';

import AsyncButton from '~/components/AsyncButton';

import { formatDate } from '~/common/utils';
import { useDispatch } from '~/common/hooks';

import { selectOrderDetails } from '../features/orderDetails';
import { closeOrder } from '../features/orderActions';

export const OrderDetails: React.FC = () => {
  const order = useSelector(selectOrderDetails);
  const dispatch = useDispatch();

  const close = useCallback(async () => {
    await dispatch(closeOrder(order.id));
  }, [dispatch]);

  return (
    <Column>
      <div>
        <Label>Открыт</Label>
        <div>{formatDate(order.start, 'yyyy-MM-dd')}</div>
      </div>
      {order.end && (
        <div>
          <Label>Закрыт</Label>
          <div>{formatDate(order.end, 'yyyy-MM-dd')}</div>
        </div>
      )}
      {order.value && (
        <div>
          <Label>Стоимость</Label>
          <div>{order.value}</div>
        </div>
      )}
      {order.end ? null : (
        <div>
          <AsyncButton act={close}>Закрыть</AsyncButton>
        </div>
      )}
    </Column>
  );
};

export default OrderDetails;
