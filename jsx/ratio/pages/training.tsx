import React from 'react';
import styled from 'styled-components';

import { A, Column, Row, colors } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import ActionButton from '~/components/ActionButton';

import { Training, Ticket } from '../types';
import { trainingToKey, getTraining, getTickets } from '../api';

import CreateEmailButton from '../components/CreateEmailButton';

interface Props {
  training: Training;
  tickets: Ticket[];
  children?: React.ReactNode;
}

const TrainingActionButton = ({
  training,
  action,
  children,
}: {
  training: Training;
  action: string;
  children: React.ReactNode;
}) => {
  const key = trainingToKey(training);
  const path = `ratio/training/${key}/${action}`;
  return <ActionButton path={path}>{children}</ActionButton>;
};

export const Badge = styled.div`
  background-color: ${colors.accent[500]};
  border-radius: 10px;
  font-size: 12px;
  min-width: 20px;
  padding: 2px 6px;
  width: auto;
`;

const CanceledBadge = () => <Badge>ОТКАЗ</Badge>;

const TicketItem = ({ ticket }: { ticket: Ticket }) => {
  return (
    <li>
      <Row>
        <span>
          {ticket.first_name} {ticket.last_name} ({ticket.email})
        </span>
        {ticket.status === 'canceled' && <CanceledBadge />}
      </Row>
    </li>
  );
};

const TicketList = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <ul>
      {tickets.map(ticket => (
        <TicketItem key={ticket.email} ticket={ticket} />
      ))}
    </ul>
  );
};

const RatioTrainingPage = ({ training, tickets }: Props) => {
  return (
    <Page title={training.name} team>
      <Page.Title>{training.name}</Page.Title>
      <Page.Main>
        <A href={`/admin/ratio/training/${training.name}/change/`}>
          править в админке
        </A>
        <p>
          Когда: <strong>{training.date}</strong>
        </p>

        <section>
          <A href="./schedule/">Расписание</A>
        </section>

        <section>
          <h2>
            Участники:{' '}
            <A
              href={`/admin/ratio/ticket/?training__name__exact=${
                training.name
              }`}
            >
              {tickets.length}
            </A>
          </h2>
          <TicketList tickets={tickets} />
        </section>

        <Column>
          <h2>Рассылки</h2>
          <TrainingActionButton training={training} action="to_mailchimp">
            Отправить участников в mailchimp
          </TrainingActionButton>
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
            <TrainingActionButton training={training} action="pay_salaries">
              Оплатить проведение тренерам
            </TrainingActionButton>
          )}
        </Column>
      </Page.Main>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  const training = await getTraining(api, params.name);
  const tickets = await getTickets(api, params.name);
  return { training, tickets };
};

const screen: Screen<Props> = {
  component: RatioTrainingPage,
  getInitialData,
};

export default screen;
