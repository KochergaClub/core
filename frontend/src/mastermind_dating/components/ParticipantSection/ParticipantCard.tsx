import 'react-toggle/style.css';

import { useCallback } from 'react';
import Toggle from 'react-toggle';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { AsyncButton, colors, Column, fonts, Row } from '~/frontkit';

import {
    MastermindDatingActivateVotingDocument, MastermindDatingParticipantFragment as Participant,
    MastermindDatingSetPresenceStatusDocument
} from '../../queries.generated';

const Photo = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const EmptyPhotoContainer = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid ${colors.grey[300]};
  text-align: center;
  font-size: ${fonts.sizes.XL};
  color: ${colors.grey[700]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyPhoto = () => {
  return <EmptyPhotoContainer>Нет фото</EmptyPhotoContainer>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin-bottom: 80px;
`;

const Description = styled.small`
  line-height: 1.3;
  text-align: center;
`;

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
    <Container key={participant.id}>
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
      <Description>{participant.desc}</Description>
    </Container>
  );
};

export default ParticipantCard;
