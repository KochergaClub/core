import React, { useCallback, useState } from 'react';

import { Button, Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '../common/types';
import { useAPI } from '../common/hooks';
import Page from '../components/Page';

import { Training, Ticket } from './types';

import CreateEmailButton from './components/CreateEmailButton';

interface Props {
  training: Training;
  tickets: Ticket[];
  children?: React.ReactNode;
}

// TODO - change api to accept slug
const trainingNameToKey = (trainingName: string) =>
  encodeURIComponent(trainingName);
const trainingToKey = (training: Training) => trainingNameToKey(training.name);

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
      const key = trainingToKey(training);
      await api.call(`ratio/training/${key}/${action}`, 'POST');
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
    <Page title={training.name} team>
      <Page.Title>{training.name}</Page.Title>
      <Page.Main>
        <a href={`/admin/ratio/training/${training.name}/change/`}>
          править в админке
        </a>
        <p>
          Когда: <strong>{training.date}</strong>
        </p>

        <section>
          <a href="./schedule/">Расписание</a>
        </section>

        <section>
          <h2>
            Участники:{' '}
            <a
              href={`/admin/ratio/ticket/?training__name__exact=${
                training.name
              }`}
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

        <Column>
          <h2>Рассылки</h2>
          <ActionButton training={training} action="to_mailchimp">
            Отправить участников в mailchimp
          </ActionButton>
          <CreateEmailButton
            prototypes={[
              {
                title: 'Предрассылка',
                url: `ratio/training/${trainingToKey(
                  training
                )}/email_prototype_pre`,
              },
              {
                title: 'Пострассылка',
                url: `ratio/training/${trainingToKey(
                  training
                )}/email_prototype_post`,
              },
            ]}
            create={`ratio/training/${trainingToKey(training)}/email`}
          >
            Написать
          </CreateEmailButton>

          {training.salaries_paid || (
            <ActionButton training={training} action="pay_salaries">
              Оплатить проведение тренерам
            </ActionButton>
          )}
        </Column>
      </Page.Main>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  const key = trainingNameToKey(params.name);
  console.log(key);
  const training = await api.call(`ratio/training/${key}`, 'GET');
  const tickets = await api.call(`ratio/training/${key}/tickets`, 'GET');
  return { training, tickets };
};

const screen: Screen<Props> = {
  component: RatioTrainingPage,
  getInitialData,
};

export default screen;
