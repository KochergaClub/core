import { useCallback } from 'react';
import { FaComments, FaEdit, FaRegListAlt } from 'react-icons/fa';

import { useMutation, useQuery } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { A, colors, Column, Label, Row } from '@kocherga/frontkit';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import PageHeader from '~/blocks/PageHeader';
import {
    ApolloQueryResults, AsyncButton, PaddedBlock, Page, ParentLinkInHeader
} from '~/components';
// import CreateEmailButton from '~/ratio/components/CreateEmailButton';
import TrainingTicketsBlock from '~/ratio/components/TrainingTicketsBlock';

import {
    RatioTrainingBySlugDocument, RatioTrainingSyncParticipantsToMailchimpDocument,
    RatioTrainingSyncParticipantsToMailchimpMutationVariables
} from '../queries.generated';

interface Props {
  slug: string;
}

function MutationButton<V extends Record<string, unknown>>({
  mutation,
  variables,
  children,
}: {
  mutation: TypedDocumentNode<unknown, V>;
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
  const queryResults = useQuery(RatioTrainingBySlugDocument, {
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
