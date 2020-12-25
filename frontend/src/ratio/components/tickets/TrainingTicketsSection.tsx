import React from 'react';

import { Column, Row } from '~/frontkit';

import { RatioTrainingFragment } from '../../queries.generated';
import { CreateTicketButton } from './CreateTicketButton';
import TicketList from './TicketList';

interface Props {
  training: RatioTrainingFragment;
}

export const TrainingTicketsSection: React.FC<Props> = ({ training }) => {
  return (
    <div>
      <h2>
        <Row vCentered gutter={8}>
          <div>Участники: {training.tickets.length}</div>
          <CreateTicketButton training={training} />
        </Row>
      </h2>
      <Column stretch>
        <TicketList tickets={training.tickets} />
      </Column>
    </div>
  );
};
