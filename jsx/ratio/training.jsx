import React from 'react';

import Page from '../components/Page';

import { Button } from '@kocherga/frontkit';

export default ({ training, tickets, urls, csrfToken }) => (
  <Page title="Ratio">
    <h1>{training.name}</h1>
    <p>
      Когда: <strong>{training.date}</strong>
    </p>

    <section>
      <h2>
        Участники: <a href={urls.tickets_admin}>{tickets.length}</a>
      </h2>
      <ul>{tickets.map(ticket => <li>{ticket.email}</li>)}</ul>
    </section>

    <div>
      <form method="post" action={urls.actions.to_mailchimp}>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
        <Button type="submit">Отправить участников в mailchimp</Button>
      </form>
    </div>

    <div>
      <form method="post" action={urls.actions.post_email}>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
        <Button type="submit">Создать черновик пострассылки</Button>
      </form>
    </div>

    <section>
      <a href={urls.schedule}>Расписание</a>
    </section>
  </Page>
);
