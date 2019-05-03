import React, { useCallback, useState } from 'react';

import { Button, Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '../common/types';
import { useAPI } from '../common/hooks';
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
  const api = useAPI();
  const [loading, setLoading] = useState(false);

  const cb = useCallback(
    async () => {
      setLoading(true);
      const key = encodeURIComponent(training.name); // TODO - change api to accept slug
      await api.call(`ratio/training/${key}/${action}/`, 'POST');
      setLoading(false);
    },
    [training, action]
  );
  return (
    <Button loading={loading} disabled={loading} onClick={cb}>
      {children}
    </Button>
  );
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
        <a href="./schedule/">Расписание</a>
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
  const key = encodeURIComponent(params.name); // TODO - change api to accept slug
  console.log(key);
  const training = await api.call(`ratio/training/${key}`, 'GET');
  const tickets = await api.call(`ratio/training/${key}/tickets`, 'GET');
  return { training, tickets };
};

const screen: Screen = {
  component: RatioTrainingPage,
  getInitialData,
};

export default screen;
