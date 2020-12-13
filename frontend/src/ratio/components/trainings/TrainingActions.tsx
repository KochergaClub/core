import React from 'react';

import { MutationButton } from '~/components';
import { Column } from '~/frontkit';

// import CreateEmailButton from './CreateEmailButton';
import {
    RatioTrainingFragment, RatioTrainingSyncParticipantsToMailchimpDocument
} from '../../queries.generated';

interface Props {
  training: RatioTrainingFragment;
}

export const TrainingActions: React.FC<Props> = ({ training }) => {
  return (
    <div>
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
    </div>
  );
};
