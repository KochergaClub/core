import React from 'react';

import { MutationButton, PaddedBlock } from '~/components';
import { Column } from '~/frontkit';

// import CreateEmailButton from './CreateEmailButton';
import {
    RatioTrainingFragment, RatioTrainingSyncParticipantsToMailchimpDocument
} from '../../queries.generated';

interface Props {
  training: RatioTrainingFragment;
}

export const TrainingActionsBlock: React.FC<Props> = ({ training }) => {
  return (
    <PaddedBlock>
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
      </Column>
    </PaddedBlock>
  );
};
