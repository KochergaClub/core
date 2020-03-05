import { useCallback } from 'react';
import { DocumentNode } from 'graphql';
import { useMutation } from '@apollo/react-hooks';

import { A, Column, Row, Label } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import {
  ApolloQueryResults,
  AsyncButton,
  Page,
  PaddedBlock,
  ParentLinkInHeader,
} from '~/components';

import PageHeader from '~/blocks/PageHeader';

import {
  useRatioTrainingBySlugQuery,
  RatioTrainingSyncParticipantsToMailchimpDocument,
  RatioTrainingSyncParticipantsToMailchimpMutationVariables,
} from '../queries.generated';

import CreateEmailButton from '~/ratio/components/CreateEmailButton';
import TrainingTicketsBlock from '~/ratio/components/TrainingTicketsBlock';

interface Props {
  slug: string;
}

function MutationButton<V extends {}>({
  mutation,
  variables,
  children,
}: {
  mutation: DocumentNode;
  variables: V;
  children: React.ReactNode;
}) {
  const [mutationCb] = useMutation(mutation);
  const act = useCallback(async () => {
    await mutationCb({
      variables,
    });
  }, [mutationCb, variables]);
  return <AsyncButton act={act}>{children}</AsyncButton>;
}

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
      <ApolloQueryResults {...queryResults} size="block">
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
                    Править в Django-админке
                  </A>

                  <A href={`/team/ratio/training/${training.slug}/schedule`}>
                    Расписание
                  </A>

                  {training.telegram_link && (
                    <A href={training.telegram_link}>Telegram-чат</A>
                  )}
                </Column>
              </PaddedBlock>

              <TrainingTicketsBlock training={training} />

              <PaddedBlock width="max">
                <h2>Рассылки</h2>
                <Column>
                  <MutationButton
                    mutation={RatioTrainingSyncParticipantsToMailchimpDocument}
                    variables={
                      {
                        training_id: training.id,
                      } as RatioTrainingSyncParticipantsToMailchimpMutationVariables
                    }
                  >
                    Отправить участников в mailchimp
                  </MutationButton>
                  <CreateEmailButton
                    prototypes={[
                      {
                        title: 'Предрассылка',
                        type: 'pre',
                      },
                      {
                        title: 'Пострассылка',
                        type: 'post',
                      },
                    ]}
                    training_id={training.id}
                  />
                </Column>
              </PaddedBlock>
            </Page.Main>
          </>
        )}
      </ApolloQueryResults>
    </Page>
  );
};

RatioTrainingPage.getInitialProps = async ({ query }) => {
  const slug = query.slug as string;

  return { slug };
};

export default withApollo(withStaff(RatioTrainingPage));
