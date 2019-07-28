import React from 'react';

import styled from 'styled-components';

import { Participant, Cohort } from '../../../types';

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
  cohort: Cohort;
}

const ParticipantList: React.FC<Props> = ({ participants, cohort }) => {
  return (
    <ListContainer>
      {participants.map(participant => (
        <ParticipantCard
          key={participant.id}
          participant={participant}
          cohort={cohort}
        />
      ))}
    </ListContainer>
  );
};

export default ParticipantList;
