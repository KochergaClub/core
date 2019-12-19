import { useCallback } from 'react';

import { Row, Label } from '@kocherga/frontkit';

import { PagedCollection, CustomCardListView } from '~/components/collections';
import { useDispatch } from '~/common/hooks';

import { customersFeature, addCustomer } from '../features/customers';
import { CreateCustomerParams, Customer } from '../types';

import shapes from '../../shapes';

import CustomerLink from './CustomerLink';

const CustomerCard: React.FC<{ customer: Customer }> = ({ customer }) => {
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
  const dispatch = useDispatch();

  const add = useCallback(
    async (values: CreateCustomerParams) => {
      await dispatch(addCustomer(values));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    (customer: Customer) => <CustomerCard customer={customer} />,
    []
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
      view={props => <CustomCardListView {...props} renderItem={renderItem} />}
    />
  );
};

export default CustomersScreen;
