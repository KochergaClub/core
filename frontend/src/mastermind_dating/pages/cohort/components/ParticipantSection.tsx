import { useState } from 'react';
import Toggle from 'react-toggle';

import Head from 'next/head';

import { Column, Row } from '@kocherga/frontkit';

import { ActionButton } from '~/components';

import { Cohort, Participant } from '../../../types';

import { useCohortParticipantsReloader } from '../hooks';

import ParticipantList from './ParticipantList';
import CreateParticipantButton from './CreateParticipantButton';

interface Props {
  cohort: Cohort;
  participants: Participant[];
}

const ParticipantSection: React.FC<Props> = ({ cohort, participants }) => {
  const uninvitedCount = participants.filter(p => !p.invite_email_sent).length;

  const cohortParticipantsReloader = useCohortParticipantsReloader(cohort);

  const [hideUnregistered, setHideUnregistered] = useState(false);

  const shownParticipants = hideUnregistered
    ? participants.filter(p => p.name)
    : participants;

  return (
    <section>
      <h1>Участники</h1>
      <Column gutter={32}>
        <Row>
          <CreateParticipantButton cohort={cohort} />
          {cohort.event_id && (
            <ActionButton
              path={`mastermind_dating/cohort/${cohort.id}/populate_from_event`}
              asyncOnSuccess={cohortParticipantsReloader}
            >
              Загрузить участников из события
            </ActionButton>
          )}
          {uninvitedCount ? (
            <ActionButton
              path={`mastermind_dating/cohort/${cohort.id}/send_invite_emails`}
              asyncOnSuccess={cohortParticipantsReloader}
            >
              Разослать приглашения в бота ({uninvitedCount}/
              {participants.length})
            </ActionButton>
          ) : null}
        </Row>
        <Row gutter={4}>
          <Head>
            <link rel="stylesheet" href="/static/react-toggle/style.css" />
          </Head>
          <Toggle
            checked={hideUnregistered}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHideUnregistered(e.target.checked)
            }
          />
          <div>
            {hideUnregistered
              ? 'Незарегистрировавшиеся скрыты'
              : 'Незарегистрировавшиеся показаны'}
          </div>
        </Row>
        <ParticipantList participants={shownParticipants} cohort={cohort} />
      </Column>
    </section>
  );
};

export default ParticipantSection;
