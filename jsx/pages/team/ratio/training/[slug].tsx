import React, { useCallback, useReducer } from 'react';

import { A, Column } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { useAPI } from '~/common/hooks';
import { selectAPI, selectUser } from '~/core/selectors';

import Page from '~/components/Page';
import ActionButton from '~/components/ActionButton';
import CreateButton from '~/components/crud/CreateButton';
import { FormField } from '~/components/crud/types';

import { Training, Ticket } from '~/ratio/types';
import { getTraining, getTickets } from '~/ratio/api';

import CreateEmailButton from '~/ratio/components/CreateEmailButton';
import TicketList from '~/ratio/pages/training/components/TicketList';

import {
  reducer,
  TrainingContext,
  KkmContext,
} from '~/ratio/pages/training/store';

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

const CreateTicketButton = ({
  training_id,
  onCreate,
}: {
  training_id: number;
  onCreate: () => void;
}) => {
  const fields: FormField[] = [
    { name: 'training', type: 'number', readonly: true, value: training_id },
    { name: 'email', type: 'string' },
    { name: 'first_name', type: 'string' },
    { name: 'last_name', type: 'string' },
    { name: 'payment_amount', type: 'number' },
    {
      name: 'fiscalization_status',
      type: 'choice',
      options: ['todo', 'fiscalized'],
    },
  ];

  return (
    <CreateButton
      apiEndpoint="/ratio/ticket"
      fields={fields}
      onCreate={onCreate}
    />
  );
};

const RatioTrainingPage: NextPage<Props> = props => {
  const [store, dispatch] = useReducer(reducer, {
    training: props.training,
    tickets: props.tickets,
  });

  const api = useAPI();

  const onCreateTicket = useCallback(async () => {
    const tickets = await getTickets(api, store.training.slug);
    dispatch({
      type: 'REPLACE_TICKETS',
      payload: { tickets },
    });
  }, [api, store.training.slug]);

  return (
    <KkmContext.Provider value={{ password: props.kkmPassword }}>
      <TrainingContext.Provider value={{ store, dispatch }}>
        <Page title={store.training.name} team>
          <Page.Title>{store.training.name}</Page.Title>
          <Page.Main>
            <A href={`/admin/ratio/training/${store.training.id}/change/`}>
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
                  href={`/admin/ratio/ticket/?training__id__exact=${
                    store.training.id
                  }`}
                >
                  {store.tickets.length}
                </A>
              </h2>
              <TicketList tickets={store.tickets} />
              <CreateTicketButton
                training_id={store.training.id}
                onCreate={onCreateTicket}
              />
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

RatioTrainingPage.getInitialProps = async ({ store: { getState }, query }) => {
  const api = selectAPI(getState());
  const user = selectUser(getState());

  const training = await getTraining(api, query.slug as string);
  const tickets = await getTickets(api, query.slug as string);

  let kkmPassword: string | undefined = undefined;
  if (user.permissions.includes('cashier.kkm_user')) {
    kkmPassword = (await api.call('cashier/kkm/password', 'GET')).password;
  }

  return { training, tickets, kkmPassword };
};

export default RatioTrainingPage;
