import React, { useCallback, useContext } from 'react';

import { Button, Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '../common/types';
import GlobalContext from '../components/GlobalContext';
import Page from '../components/Page';

import { Training, Ticket } from './types';

interface Props {
  training: Training;
  tickets: Ticket[];
  children?: React.ReactNode;
}

const ActionButton = ({
  training,
  action,
  children,
}: {
  training: Training;
  action: string;
  children: React.ReactNode;
}) => {
  const { api } = useContext(GlobalContext);
  const cb = useCallback(
    async () => {
      await api.call('ratio/training/${training.name}/${action}', 'POST');
    },
    [training, action]
  );
  return <Button onClick={cb}>{children}</Button>;
};

const RatioTrainingPage = ({ training, tickets }: Props) => {
  return (
    <Page title="Ratio" team>
      <h1>{training.name}</h1>
      <a href={`/admin/ratio/training/${training.name}/change/`}>
        править в админке
      </a>
      <p>
        Когда: <strong>{training.date}</strong>
      </p>

      <section>
        <h2>
          Участники:{' '}
          <a
            href={`/admin/ratio/ticket/?training__name__exact=${training.name}`}
          >
            {tickets.length}
          </a>
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
        <a href="./schedule">Расписание</a>
      </section>

      <Column>
        <ActionButton training={training} action="to_mailchimp">
          Отправить участников в mailchimp
        </ActionButton>
        <ActionButton training={training} action="pre_email">
          Создать черновик предрассылки
        </ActionButton>
        <ActionButton training={training} action="post_email">
          Создать черновик пострассылки
        </ActionButton>

        {training.salaries_paid || (
          <ActionButton training={training} action="pay_salaries">
            Оплатить проведение тренерам
          </ActionButton>
        )}
      </Column>
    </Page>
  );
};

const getInitialData: InitialLoader = async ({ api }, params, query) => {
  const training = await api.call(`ratio/training/${params.name}`, 'GET');
  const tickets = await api.call(
    `ratio/training/${params.name}/tickets`,
    'GET'
  );
  return { training, tickets };
};

const screen: Screen = {
  component: RatioTrainingPage,
  getInitialData,
};

export default screen;
