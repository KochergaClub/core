import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { AsyncButton, Column, Row, Toggle } from '~/frontkit';

import {
    MastermindDatingActivateVotingDocument, MastermindDatingParticipantFragment as Participant,
    MastermindDatingSetPresenceStatusDocument
} from '../../queries.generated';

const Photo: React.FC<{ src: string }> = ({ src }) => (
  <img src={src} className="w-48 h-48 object-contain" />
);

const EmptyPhoto = () => {
  return (
    <div className="w-48 h-48 border border-gray-300 grid place-items-center text-gray-500 text-3xl">
      <div>Нет фото</div>
    </div>
  );
};

interface Props {
  participant: Participant;
}

const VoteForm: React.FC<Props> = ({ participant }) => {
  const [mutation] = useMutation(MastermindDatingActivateVotingDocument, {
    variables: {
      participant_id: participant.id,
    },
  });

  if (participant.voted_for) {
    return <em>Уже проголосовали</em>;
  }

  return <AsyncButton act={mutation}>Активировать голосование</AsyncButton>;
};

const ParticipantCard: React.FC<Props> = (props) => {
  const { participant } = props;

  const [setPresenceStatusMutation] = useMutation(
    MastermindDatingSetPresenceStatusDocument
  );

  const onPresenceChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      await setPresenceStatusMutation({
        variables: {
          participant_id: participant.id,
          present: e.target.checked,
        },
      });
    },
    [setPresenceStatusMutation, participant.id]
  );

  return (
    <div className="flex flex-col items-center mb-20 w-60" key={participant.id}>
      <Column centered>
        <span>{participant.user.email}</span>
        <strong>{participant.name || 'НЕ ЗАРЕГИСТРИРОВАН'}</strong>
      </Column>
      <Column centered>
        {participant.photo ? <Photo src={participant.photo} /> : <EmptyPhoto />}
        <Row>
          <span>Не тут</span>
          <Toggle checked={participant.present} onChange={onPresenceChange} />
          <span>Тут</span>
        </Row>
        {participant.present && <VoteForm {...props} />}
      </Column>
      <div className="text-xs text-center">{participant.desc}</div>
    </div>
  );
};

export default ParticipantCard;
