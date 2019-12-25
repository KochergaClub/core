import { NextPage } from '~/common/types';
import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import { A, Column, Row, Label } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';

import { selectUser } from '~/core/selectors';

import {
  Page,
  ActionButton,
  PaddedBlock,
  ParentLinkInHeader,
} from '~/components';

import PageHeader from '~/blocks/PageHeader';

import { loadKkmPassword } from '~/kkm/actions';

import {
  TrainingFragment,
  useRatioTrainingBySlugQuery,
} from '../queries.generated';

import CreateEmailButton from '~/ratio/components/CreateEmailButton';
import TrainingTicketsBlock from '~/ratio/components/TrainingTicketsBlock';

interface Props {
  slug: string;
}

const TrainingActionButton: React.FC<{
  training: TrainingFragment;
  action: string;
}> = ({ training, action, children }) => {
  const path = `ratio/training/${training.slug}/${action}`;
  return <ActionButton path={path}>{children}</ActionButton>;
};

const RatioTrainingPage: NextPage<Props> = ({ slug }) => {
  const queryResults = useRatioTrainingBySlugQuery({
    variables: { slug },
  });

  return (
    <Page
      title={
        queryResults.data ? queryResults.data.training.name : 'Загружается...'
      }
      team
    >
      <ApolloQueryResults {...queryResults}>
        {({ data: { training } }) => (
          <>
            <PageHeader
              top={
                <ParentLinkInHeader href="/team/ratio">
                  Рацио-тренинг
                </ParentLinkInHeader>
              }
              title={training.name}
            />
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

              <TrainingTicketsBlock training={training} />

              <PaddedBlock width="max">
                <h2>Рассылки</h2>
                <Column>
                  <TrainingActionButton
                    training={training}
                    action="to_mailchimp"
                  >
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
                </Column>
              </PaddedBlock>
            </Page.Main>
          </>
        )}
      </ApolloQueryResults>
    </Page>
  );
};

RatioTrainingPage.getInitialProps = async ({
  store: { dispatch, getState },
  query,
}) => {
  const user = selectUser(getState());

  const slug = query.slug as string;

  if (user.permissions.includes('cashier.kkm_user')) {
    await dispatch(loadKkmPassword());
  }

  return { slug };
};

export default withApollo(withStaff(RatioTrainingPage));
