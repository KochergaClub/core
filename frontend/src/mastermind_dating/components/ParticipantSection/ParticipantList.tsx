import styled from 'styled-components';

import { MastermindDatingParticipantFragment as Participant } from '../../queries.generated';

import ParticipantCard from './ParticipantCard';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * + * {
    margin-left: 15px;
  }
`;

interface Props {
  participants: Participant[];
}

const ParticipantList: React.FC<Props> = ({ participants }) => {
  return (
    <ListContainer>
      {participants.map(participant => (
        <ParticipantCard key={participant.id} participant={participant} />
      ))}
    </ListContainer>
  );
};

export default ParticipantList;
