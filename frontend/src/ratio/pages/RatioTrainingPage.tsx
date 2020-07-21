import { useCallback } from 'react';
import { DocumentNode } from 'graphql';
import { useMutation } from '@apollo/react-hooks';

import { FaComments, FaEdit, FaRegListAlt } from 'react-icons/fa';

import { A, Column, Row, Label, colors } from '@kocherga/frontkit';

import { withApollo, withStaff, NextApolloPage } from '~/apollo';

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

// import CreateEmailButton from '~/ratio/components/CreateEmailButton';
import TrainingTicketsBlock from '~/ratio/components/TrainingTicketsBlock';

interface Props {
  slug: string;
}

function MutationButton<V extends Record<string, unknown>>({
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

const LinkWithIcon = ({
  icon,
  href,
  text,
}: {
  icon: React.ElementType;
  href: string;
  text: string;
}) => {
  const Icon = icon;
  return (
    <div>
      <Icon style={{ color: colors.grey[500] }} /> <A href={href}>{text}</A>
    </div>
  );
};

const RatioTrainingPage: NextApolloPage<Props> = ({ slug }) => {
  const queryResults = useRatioTrainingBySlugQuery({
    variables: { slug },
  });

  return (
    <Page
      title={
        queryResults.data ? queryResults.data.training.name : 'Загружается...'
      }
      menu="team"
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

                  <LinkWithIcon
                    href={`/admin/ratio/training/${training.id}/change/`}
                    text="Править в Django-админке"
                    icon={FaEdit}
                  />

                  <LinkWithIcon
                    href={`/team/ratio/training/${training.slug}/schedule`}
                    text="Расписание"
                    icon={FaRegListAlt}
                  />

                  {training.telegram_link && (
                    <LinkWithIcon
                      href={training.telegram_link}
                      text="Telegram-чат"
                      icon={FaComments}
                    />
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
                  {/* <CreateEmailButton
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
                  /> */}
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
