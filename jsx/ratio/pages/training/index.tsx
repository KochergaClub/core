import React, { useReducer } from 'react';

import { A, Column } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import ActionButton from '~/components/ActionButton';

import { Training, Ticket } from '../../types';
import { getTraining, getTickets } from '../../api';

import CreateEmailButton from '../../components/CreateEmailButton';
import TicketList from './components/TicketList';

import { reducer, TrainingContext, KkmContext } from './store';

interface Props {
  training: Training;
  tickets: Ticket[];
  kkmPassword?: string;
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
  const path = `ratio/training/${training.slug}/${action}`;
  return <ActionButton path={path}>{children}</ActionButton>;
};

const RatioTrainingPage = (props: Props) => {
  const [store, dispatch] = useReducer(reducer, {
    training: props.training,
    tickets: props.tickets,
  });

  return (
    <KkmContext.Provider value={{ password: props.kkmPassword }}>
      <TrainingContext.Provider value={{ store, dispatch }}>
        <Page title={store.training.name} team>
          <Page.Title>{store.training.name}</Page.Title>
          <Page.Main>
            <A href={`/admin/ratio/training/${store.training.name}/change/`}>
              править в django-админке
            </A>
            <p>
              Когда: <strong>{store.training.date}</strong>
            </p>

            <section>
              <A href="./schedule/">Расписание</A>
            </section>

            <section>
              <h2>
                Участники:{' '}
                <A
                  href={`/admin/ratio/ticket/?training__name__exact=${
                    store.training.name
                  }`}
                >
                  {store.tickets.length}
                </A>
              </h2>
              <TicketList tickets={store.tickets} />
            </section>

            <Column>
              <h2>Рассылки</h2>
              <TrainingActionButton
                training={store.training}
                action="to_mailchimp"
              >
                Отправить участников в mailchimp
              </TrainingActionButton>
              <CreateEmailButton
                prototypes={[
                  {
                    title: 'Предрассылка',
                    url: `ratio/training/${
                      store.training.slug
                    }/email_prototype_pre`,
                  },
                  {
                    title: 'Пострассылка',
                    url: `ratio/training/${
                      store.training.slug
                    }/email_prototype_post`,
                  },
                ]}
                create={`ratio/training/${store.training.slug}/email`}
              >
                Написать
              </CreateEmailButton>

              {store.training.salaries_paid || (
                <TrainingActionButton
                  training={store.training}
                  action="pay_salaries"
                >
                  Оплатить проведение тренерам
                </TrainingActionButton>
              )}
            </Column>
          </Page.Main>
        </Page>
      </TrainingContext.Provider>
    </KkmContext.Provider>
  );
};

const getInitialData: InitialLoader<Props> = async (
  { api, user },
  { params }
) => {
  const training = await getTraining(api, params.name);
  const tickets = await getTickets(api, params.name);

  let kkmPassword: string | undefined = undefined;
  if (user.permissions.includes('cashier.kkm_user')) {
    kkmPassword = (await api.call('cashier/kkm/password', 'GET')).password;
  }

  return { training, tickets, kkmPassword };
};

const screen: Screen<Props> = {
  component: RatioTrainingPage,
  getInitialData,
};

export default screen;
