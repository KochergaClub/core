import * as React from 'react';

import Page from '../components/Page';
import ActionForm from '../components/ActionForm';

interface Cheque {
  id: number;
  amount: number;
  whom: string;
  is_redeemed: boolean;
}

interface Props {
  cheques: Cheque[];
}

export default ({ cheques }: Props) => (
  <Page title="Касса" team>
    <h1>Касса</h1>
    <h2>Выплаты</h2>
    <ul>
      {cheques.map(cheque => (
        <li>
          {cheque.amount} руб. &rarr; {cheque.whom}
          {cheque.is_redeemed || (
            <ActionForm
              action={`/team/cashier/cheque/${cheque.id}/action/redeem`}
              title="Выплачено"
            />
          )}
        </li>
      ))}
    </ul>
  </Page>
);
