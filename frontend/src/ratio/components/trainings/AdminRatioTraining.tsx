import Head from 'next/head';
import { FaComments, FaEdit, FaRegListAlt } from 'react-icons/fa';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, MutationButton, PaddedBlock, Page } from '~/components';
import { A, colors, Column, Label, Row } from '~/frontkit';

import {
    RatioTrainingBySlugDocument, RatioTrainingSyncParticipantsToMailchimpDocument
} from '../../queries.generated';
import TrainingTicketTypesBlock from '../ticket-types/TicketTypesBlock';
// import CreateEmailButton from '~/ratio/components/CreateEmailButton';
import TrainingTicketsBlock from '../TrainingTicketsBlock';

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

interface Props {
  slug: string;
}

const AdminRatioTraining: React.FC<Props> = ({ slug }) => {
  const queryResults = useQuery(RatioTrainingBySlugDocument, {
    variables: { slug },
  });

  return (
    <ApolloQueryResults {...queryResults} size="block">
      {({ data: { training } }) => (
        <>
          <Head>
            <title key="title">{training.name}</title>
          </Head>
          <Page.Title>{training.name}</Page.Title>
          <Page.Main>
            <PaddedBlock width="max">
              <Column>
                {training.date && (
                  <Row vCentered>
                    <Label>Когда:</Label>
                    <strong>{training.date}</strong>
                  </Row>
                )}

                {training.date && (
                  <LinkWithIcon
                    href={`/team/ratio/training/${training.slug}/schedule`}
                    text="Расписание"
                    icon={FaRegListAlt}
                  />
                )}

                {training.telegram_link && (
                  <LinkWithIcon
                    href={training.telegram_link}
                    text="Telegram-чат"
                    icon={FaComments}
                  />
                )}
              </Column>
            </PaddedBlock>

            <TrainingTicketTypesBlock training={training} />
            <TrainingTicketsBlock training={training} />

            <PaddedBlock width="max">
              <h2>Рассылки</h2>
              <Column>
                <MutationButton
                  mutation={RatioTrainingSyncParticipantsToMailchimpDocument}
                  variables={{
                    training_id: training.id,
                  }}
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
  );
};

export default AdminRatioTraining;
