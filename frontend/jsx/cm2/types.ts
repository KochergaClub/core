import { FormShape } from '~/components/forms/types';

export interface ServerOrder {
  id: number;
  start: string;
  end?: string;
}

export interface CreateOrderParams {}

export interface Order {
  id: number;
  start: Date;
  end?: Date;
}

export const parseServerOrder = (serverOrder: ServerOrder): Order => {
  return {
    ...serverOrder,
    start: new Date(serverOrder.start),
    end: serverOrder.end ? new Date(serverOrder.end) : undefined,
  };
};

export const orderShape: FormShape = [
  { type: 'number', name: 'id', readonly: true, optional: true },
];
