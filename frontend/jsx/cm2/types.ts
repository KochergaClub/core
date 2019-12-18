import { FormShape } from '~/components/forms/types';

export interface ServerOrder {
  id: number;
  start: string;
  end?: string;
  value?: number;
  customer?: number;
}

export interface CreateOrderParams {}

export interface Order {
  id: number;
  start: Date;
  end?: Date;
  value?: number;
  customer?: number;
}

export const parseServerOrder = (serverOrder: ServerOrder): Order => {
  return {
    ...serverOrder,
    start: new Date(serverOrder.start),
    end: serverOrder.end ? new Date(serverOrder.end) : undefined,
  };
};

export const orderShape: FormShape = [
  { type: 'number', name: 'id', title: 'ID', readonly: true },
  { type: 'date', name: 'start', title: 'Время открытия', readonly: true },
  {
    type: 'date',
    name: 'end',
    title: 'Время закрытия',
    readonly: true,
    optional: true,
  },
  { type: 'number', name: 'value', title: 'Стоимость', readonly: true },
];

export interface Customer {
  id: number;
  card_id: number;
  first_name: string;
  last_name: string;
}

export type CustomersObject = { [k: number]: Customer };

export interface CreateCustomerParams {
  card_id: number;
  first_name: string;
  last_name: string;
}

export interface OrderAux {
  order: Order;
  customer?: Customer;
}

export const orderToOrderAux = (
  order: Order,
  customersObject: CustomersObject
): OrderAux => {
  if (!order.customer) {
    return { order };
  }
  const customer = customersObject[order.customer];
  return {
    order,
    customer,
  };
};
