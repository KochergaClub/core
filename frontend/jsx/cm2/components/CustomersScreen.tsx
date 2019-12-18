import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Collection } from '~/components/collections';
import { useDispatch } from '~/common/hooks';

import { customersFeature, addCustomer } from '../features/customers';
import { CreateCustomerParams } from '../types';

import shapes from '../../shapes';

import PagedCollection from './PagedCollection';

const CustomersScreen: React.FC = () => {
  const dispatch = useDispatch();

  const add = useCallback(
    async (values: CreateCustomerParams) => {
      await dispatch(addCustomer(values));
    },
    [dispatch]
  );

  return (
    <PagedCollection
      feature={customersFeature}
      names={{
        plural: 'клиенты',
        genitive: 'клиент',
      }}
      add={{
        cb: add,
        shape: shapes.cm2.customer,
      }}
    />
  );
};

export default CustomersScreen;
