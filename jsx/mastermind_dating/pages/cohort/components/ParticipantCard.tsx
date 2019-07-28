import React from 'react';

import styled from 'styled-components';

import { Column, colors, fonts } from '@kocherga/frontkit';

import ActionButton from '~/components/ActionButton';

import { Participant, Cohort } from '../../../types';

import { useCohortParticipantsReloader } from '../hooks';

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

const actionPath = (action: string, uid: number) =>
  `mastermind_dating/participant/${uid}/${action}`;

interface Props {
  participant: Participant;
  cohort: Cohort;
}

const VoteForm: React.FC<Props> = ({ participant, cohort }) => {
  const cohortParticipantsReloader = useCohortParticipantsReloader(cohort);

  if (participant.voted_for) {
    return <em>Уже проголосовали</em>;
  }

  return (
    <ActionButton
      path={actionPath('tinder_activate', participant.id)}
      asyncOnSuccess={cohortParticipantsReloader}
    >
      Активировать голосование
    </ActionButton>
  );
};

const ParticipantCard: React.FC<Props> = props => {
  const { participant, cohort } = props;

  const cohortParticipantsReloader = useCohortParticipantsReloader(cohort);

  return (
    <Container key={participant.id}>
      <Column centered>
        <span>{participant.user}</span>
        <strong>{participant.name || 'НЕ ЗАРЕГИСТРИРОВАН'}</strong>
      </Column>
      <Column centered>
        {participant.photo ? <Photo src={participant.photo} /> : <EmptyPhoto />}
        <ActionButton
          path={actionPath('flip_present', participant.id)}
          asyncOnSuccess={cohortParticipantsReloader}
        >
          {participant.present ? 'Тут' : 'Не тут'}
        </ActionButton>
        {participant.present && <VoteForm {...props} />}
      </Column>
      <Description>{participant.desc}</Description>
    </Container>
  );
};

export default ParticipantCard;
