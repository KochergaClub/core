import Head from 'next/head';
import React from 'react';
import { FaComments, FaRegListAlt } from 'react-icons/fa';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, DropdownMenu, MutationButton, PaddedBlock, Page } from '~/components';
import { ModalAction } from '~/components/DropdownMenu';
import { A, colors, Column, Label, Row } from '~/frontkit';
import { adminTrainingScheduleRoute } from '~/ratio/routes';

import {
    RatioTrainingBySlugDocument, RatioTrainingSyncParticipantsToMailchimpDocument
} from '../../queries.generated';
import CreatePromocodeModal from '../promocodes/CreatePromocodeModal';
import EmailDiscount from '../promocodes/EmailDiscount';
import TrainingTicketTypesBlock from '../ticket-types/TicketTypesBlock';
// import CreateEmailButton from '~/ratio/components/CreateEmailButton';
import TrainingTicketsBlock from '../TrainingTicketsBlock';
import EditTrainingModal from './EditTrainingModal';
import TrainingPromocodesBlock from './TrainingPromocodesBlock';

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
                <Row>
                  <div>Управление:</div>
                  <DropdownMenu>
                    <ModalAction title="Редактировать">
                      {({ close }) => (
                        <EditTrainingModal close={close} training={training} />
                      )}
                    </ModalAction>
                    <ModalAction title="Создать промокод">
                      {({ close }) => (
                        <CreatePromocodeModal
                          close={close}
                          trainingId={training.id}
                        />
                      )}
                    </ModalAction>
                  </DropdownMenu>
                </Row>
                <Row vCentered>
                  <Label>Шаблон письма с промокодом:</Label>
                  <div>{training.promocode_email || '(пусто)'}</div>
                </Row>
                <Row vCentered>
                  <Label>Шаблон письма при регистрации:</Label>
                  <div>{training.new_ticket_email || '(пусто)'}</div>
                </Row>
                <Row vCentered>
                  <Label>Шаблон письма при заполнении notion-ссылки:</Label>
                  <div>{training.notion_created_email || '(пусто)'}</div>
                </Row>
                {training.date && (
                  <Row vCentered>
                    <Label>Когда:</Label>
                    <strong>{training.date}</strong>
                  </Row>
                )}

                {training.date && (
                  <LinkWithIcon
                    href={adminTrainingScheduleRoute(training.slug)}
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

            <PaddedBlock width="max">
              <EmailDiscount entity={training} entityType="training" />
            </PaddedBlock>
            <TrainingPromocodesBlock training={training} />
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
