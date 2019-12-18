import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Collection } from '~/components/collections';
import { useDispatch } from '~/common/hooks';

import { addCustomer, selectCustomers } from '../features/customers';
import { CreateCustomerParams } from '../types';

import shapes from '../../shapes';

const CustomersScreen: React.FC = () => {
  const customers = useSelector(selectCustomers);
  const dispatch = useDispatch();

  const add = useCallback(
    async (values: CreateCustomerParams) => {
      await dispatch(addCustomer(values));
    },
    [dispatch]
  );

  return (
    <Collection
      names={{
        plural: 'клиенты',
        genitive: 'клиент',
      }}
      add={{
        cb: add,
        shape: shapes.cm2.customer,
      }}
      items={customers}
    />
  );
};

export default CustomersScreen;
