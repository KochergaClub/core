import { FormShape } from '~/components/forms/types';

export interface ServerOrder {
  id: number;
  start: string;
  end?: string;
  value?: number;
  customer?: number;
}

export interface CreateOrderParams {
  card_id?: number;
}

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

export interface CreateCustomerParams {
  card_id: number;
  first_name: string;
  last_name: string;
}
