import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { A, Column, Row } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { selectUser } from '~/core/selectors';

import { Page, ActionButton } from '~/components';

import CreateButton from '~/components/crud/CreateButton';
import { FormShape } from '~/components/forms/types';

import { loadKkmPassword } from '~/kkm/actions';

import { Training } from '~/ratio/types';
import { loadTraining, selectTraining } from '~/ratio/features/trainingItem';
import {
  loadTrainingTickets,
  selectTrainingTickets,
} from '~/ratio/features/trainingTickets';

import CreateEmailButton from '~/ratio/components/CreateEmailButton';
import TicketList from '~/ratio/components/TicketList';

interface Props {}

const TrainingActionButton: React.FC<{
  training: Training;
  action: string;
}> = ({ training, action, children }) => {
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
  const fields: FormShape = [
    { name: 'training', type: 'number', readonly: true, value: training_id },
    { name: 'email', type: 'string' },
    { name: 'first_name', type: 'string' },
    { name: 'last_name', type: 'string' },
    { name: 'payment_amount', type: 'number' },
    {
      name: 'fiscalization_status',
      type: 'choice',
      options: ['todo', 'fiscalized'],
      value: 'todo',
    },
    {
      name: 'ticket_type',
      type: 'choice',
      options: ['normal', 'stipend', 'staff'],
      value: 'normal',
    },
    {
      name: 'payment_type',
      type: 'choice',
      options: ['website', 'invoice', 'transfer'],
      value: 'website',
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

const RatioTrainingPage: NextPage<Props> = () => {
  const dispatch = useDispatch();
  const training = useSelector(selectTraining);
  const tickets = useSelector(selectTrainingTickets);

  const onCreateTicket = useCallback(async () => {
    if (!training) {
      throw new Error('No training');
    }
    await dispatch(loadTrainingTickets(training.slug));
  }, [training]);

  if (!training) {
    throw new Error('No training');
  }

  return (
    <Page title={training.name} team>
      <Page.Title>{training.name}</Page.Title>
      <Page.Main>
        <A href={`/admin/ratio/training/${training.id}/change/`}>
          править в django-админке
        </A>
        <p>
          Когда: <strong>{training.date}</strong>
        </p>

        <section>
          <A href={`/team/ratio/training/${training.slug}/schedule`}>
            Расписание
          </A>
        </section>

        <section>
          <h2>
            <Row>
              <div>Участники:</div>
              <A
                href={`/admin/ratio/ticket/?training__id__exact=${training.id}`}
              >
                {tickets.length}
              </A>
              <CreateTicketButton
                training_id={training.id}
                onCreate={onCreateTicket}
              />
            </Row>
          </h2>
          <Column stretch>
            <TicketList tickets={tickets} />
          </Column>
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
                url: `ratio/training/${training.slug}/email_prototype_pre`,
              },
              {
                title: 'Пострассылка',
                url: `ratio/training/${training.slug}/email_prototype_post`,
              },
            ]}
            create={`ratio/training/${training.slug}/email`}
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

RatioTrainingPage.getInitialProps = async ({
  store: { dispatch, getState },
  query,
}) => {
  const user = selectUser(getState());

  const slug = query.slug as string;
  await dispatch(loadTraining(slug));
  await dispatch(loadTrainingTickets(slug));

  if (user.permissions.includes('cashier.kkm_user')) {
    await dispatch(loadKkmPassword());
  }

  return {};
};

export default RatioTrainingPage;
