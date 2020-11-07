import 'react-toggle/style.css';

import { useState } from 'react';
import Toggle from 'react-toggle';

import { useMutation } from '@apollo/client';

import { AsyncButton, Column, Row } from '~/frontkit';

import {
    MastermindDatingCohortDetailsFragment as Cohort,
    MastermindDatingPopulateCohortFromEventDocument, MastermindDatingSendInviteEmailsDocument
} from '../../queries.generated';
import CreateParticipantButton from './CreateParticipantButton';
import ParticipantList from './ParticipantList';

interface Props {
  cohort: Cohort;
}

const ParticipantSection: React.FC<Props> = ({ cohort }) => {
  const [populateFromEvent] = useMutation(
    MastermindDatingPopulateCohortFromEventDocument,
    {
      variables: {
        cohort_id: cohort.id,
      },
    }
  );

  const [sendInviteEmails] = useMutation(
    MastermindDatingSendInviteEmailsDocument,
    {
      variables: {
        cohort_id: cohort.id,
      },
    }
  );

  const uninvitedCount = cohort.participants.filter((p) => !p.invite_email_sent)
    .length;

  const [hideUnregistered, setHideUnregistered] = useState(false);

  const shownParticipants = hideUnregistered
    ? cohort.participants.filter((p) => p.name)
    : cohort.participants;

  return (
    <section>
      <h1>Участники</h1>
      <Column gutter={32}>
        <Row>
          <CreateParticipantButton cohort={cohort} />
          {cohort.event && (
            <AsyncButton act={populateFromEvent}>
              Загрузить участников из события
            </AsyncButton>
          )}
          {uninvitedCount ? (
            <AsyncButton act={sendInviteEmails}>
              Разослать приглашения в бота ({uninvitedCount}/
              {cohort.participants.length})
            </AsyncButton>
          ) : null}
        </Row>
        <Row gutter={4}>
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
        <ParticipantList participants={shownParticipants} />
      </Column>
    </section>
  );
};

export default ParticipantSection;
