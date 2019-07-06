import React from 'react';

import { Button } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';
import ActionButton from '../components/ActionButton';
import { useAPI, usePermissions } from '../common/hooks';

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
  const [canCreate] = usePermissions(['cashier.create']);

  const createTestCheque = async () => {
    await api.call('cashier/cheque', 'POST', {
      amount: 5000,
      comment: 'test comment',
      whom: 'me@berekuk.ru',
    });
  };

  if (canCreate) {
    return <Button onClick={createTestCheque}>Создать тестовый чек</Button>; // TODO - not implemented yet
  }

  return null;
};

const ChequeItem = ({ cheque }: { cheque: Cheque }) => {
  const [canRedeem] = usePermissions(['cashier.redeem']);

  return (
    <div>
      {cheque.amount} руб. &rarr; {cheque.whom}
      {canRedeem
        ? cheque.is_redeemed || (
            <ActionButton
              path={`cashier/cheque/${cheque.id}/redeem`}
              reloadOnSuccess
            >
              Выплачено
            </ActionButton>
          )
        : null}
    </div>
  );
};

const CashierPage = ({ cheques }: Props) => {
  return (
    <Page title="Касса" team>
      <Page.Title>Касса</Page.Title>
      <Page.Main>
        <h2>Выплаты</h2>
        <ul>
          {cheques.map(cheque => (
            <li key={cheque.id}>
              <ChequeItem cheque={cheque} />
            </li>
          ))}
        </ul>
        <CreateCheque />
      </Page.Main>
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
