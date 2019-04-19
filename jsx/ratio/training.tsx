import React from 'react';

import { Column } from '@kocherga/frontkit';

import Page from '../components/Page';
import ActionForm from '../components/ActionForm';

export default ({ training, tickets, urls }) => (
  <Page title="Ratio" team>
    <h1>{training.name}</h1>
    <a href={urls.training_admin}>править в админке</a>
    <p>
      Когда: <strong>{training.date}</strong>
    </p>

    <section>
      <h2>
        Участники: <a href={urls.tickets_admin}>{tickets.length}</a>
      </h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.email}>
            {ticket.first_name} {ticket.last_name} ({ticket.email})
          </li>
        ))}
      </ul>
    </section>

    <section>
      <a href={urls.schedule}>Расписание</a>
    </section>

    <Column>
      <ActionForm
        action={urls.actions.to_mailchimp}
        title="Отправить участников в mailchimp"
      />
      <ActionForm
        action={urls.actions.pre_email}
        title="Создать черновик предрассылки"
      />
      <ActionForm
        action={urls.actions.post_email}
        title="Создать черновик пострассылки"
      />

      {training.salaries_paid || (
        <ActionForm
          action={urls.actions.pay_salaries}
          title="Оплатить проведение"
        />
      )}
    </Column>
  </Page>
);
