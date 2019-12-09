import { useSelector } from 'react-redux';

import { A, Column, Row, Label } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { selectUser } from '~/core/selectors';

import { Page, ActionButton, PaddedBlock } from '~/components';

import { loadKkmPassword } from '~/kkm/actions';

import { Training } from '~/ratio/types';
import { loadTraining, selectTraining } from '~/ratio/features/trainingItem';
import { loadTrainingTickets } from '~/ratio/features/trainingTickets';

import CreateEmailButton from '~/ratio/components/CreateEmailButton';
import TrainingTicketsBlock from '~/ratio/components/TrainingTicketsBlock';

interface Props {}

const TrainingActionButton: React.FC<{
  training: Training;
  action: string;
}> = ({ training, action, children }) => {
  const path = `ratio/training/${training.slug}/${action}`;
  return <ActionButton path={path}>{children}</ActionButton>;
};

const RatioTrainingPage: NextPage<Props> = () => {
  const training = useSelector(selectTraining);

  if (!training) {
    throw new Error('No training');
  }

  return (
    <Page title={training.name} team>
      <Page.Title>{training.name}</Page.Title>
      <Page.Main>
        <PaddedBlock width="max">
          <Column>
            <Row vCentered>
              <Label>Когда:</Label>
              <strong>{training.date}</strong>
            </Row>

            <A href={`/admin/ratio/training/${training.id}/change/`}>
              Править в django-админке
            </A>

            <A href={`/team/ratio/training/${training.slug}/schedule`}>
              Расписание
            </A>
          </Column>
        </PaddedBlock>

        <TrainingTicketsBlock />

        <PaddedBlock width="max">
          <h2>Рассылки</h2>
          <Column>
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
        </PaddedBlock>
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
