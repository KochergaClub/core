import * as React from 'react';

import Page from '../components/Page';
import ActionForm from '../components/ActionForm';

interface Cheque {
  id: number;
  amount: number;
  whom: string;
  is_redeemed: boolean;
}

export default ({
  cheques,
  csrfToken,
}: {
  cheques: Cheque[];
  csrfToken: string;
}) => (
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
              csrfToken={csrfToken}
              title="Выплачено"
            />
          )}
        </li>
      ))}
    </ul>
  </Page>
);
