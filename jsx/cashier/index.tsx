import React from 'react';

import { Button } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';
import ActionButton from '../components/ActionButton';
import { useAPI } from '../common/hooks';

interface Cheque {
  id: number;
  amount: number;
  whom: string;
  is_redeemed: boolean;
}

interface Props {
  cheques: Cheque[];
}

const CreateCheque = () => {
  const api = useAPI();

  const createTestCheque = async () => {
    await api.call('cashier/cheque', 'POST', {
      amount: 5000,
      comment: 'test comment',
      whom: 'me@berekuk.ru',
    });
  };

  return null; // not implemented yet
  // TODO - check for user permissions
  return <Button onClick={createTestCheque}>Создать тестовый чек</Button>;
};

const CashierPage = ({ cheques }: Props) => {
  return (
    <Page title="Касса" team>
      <h1>Касса</h1>
      <h2>Выплаты</h2>
      <ul>
        {cheques.map(cheque => (
          <li key={cheque.id}>
            {cheque.amount} руб. &rarr; {cheque.whom}
            {cheque.is_redeemed || (
              <ActionButton path={`cheque/${cheque.id}/redeem`} reloadOnSuccess>
                Выплачено
              </ActionButton>
            )}
          </li>
        ))}
      </ul>
      <CreateCheque />
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async context => {
  const cheques = await context.api.call('cashier/cheque', 'GET');
  return { cheques };
};

const screen: Screen<Props> = {
  component: CashierPage,
  getInitialData,
};
export default screen;
