import React from 'react';

import Page from '../components/Page';

import { Button } from '@kocherga/frontkit';

const ActionForm = ({ action, title, csrfToken }) => (
  <div>
    <form method="post" action={action}>
      <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
      <Button type="submit">{title}</Button>
    </form>
  </div>
);

export default ({ training, tickets, urls, csrfToken }) => (
  <Page title="Ratio" team>
    <h1>{training.name}</h1>
    <p>
      Когда: <strong>{training.date}</strong>
    </p>

    <section>
      <h2>
        Участники: <a href={urls.tickets_admin}>{tickets.length}</a>
      </h2>
      <ul>
        {tickets.map(ticket => <li key={ticket.email}>{ticket.email}</li>)}
      </ul>
    </section>

    <ActionForm
      action={urls.actions.to_mailchimp}
      csrfToken={csrfToken}
      title="Отправить участников в mailchimp"
    />
    <ActionForm
      action={urls.actions.pre_email}
      csrfToken={csrfToken}
      title="Создать черновик предрассылки"
    />
    <ActionForm
      action={urls.actions.post_email}
      csrfToken={csrfToken}
      title="Создать черновик пострассылки"
    />

    {training.salaries_paid || (
      <ActionForm
        action={urls.actions.pay_salaries}
        csrfToken={csrfToken}
        title="Оплатить проведение"
      />
    )}

    <section>
      <a href={urls.schedule}>Расписание</a>
    </section>
  </Page>
);
