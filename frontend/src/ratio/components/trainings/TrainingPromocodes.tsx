import React from 'react';

import { useLazyQuery } from '@apollo/client';

import { ButtonWithModal } from '~/components';
import { Column } from '~/frontkit';

import { RatioTrainingFragment } from '../../queries.generated';
import CreatePromocodeModal from '../promocodes/CreatePromocodeModal';
import EmailDiscount from '../promocodes/EmailDiscount';
import PromocodesCollection from '../promocodes/PromocodesCollection';
import { RatioTrainingPromocodesPageDocument } from './queries.generated';

interface Props {
  training: RatioTrainingFragment;
}

export const TrainingPromocodes: React.FC<Props> = ({ training }) => {
  const [fetchPromocodes, queryResults] = useLazyQuery(
    RatioTrainingPromocodesPageDocument
  );

  const fetchPage = async (args?: {
    before?: string | null;
    after?: string | null;
    first?: number | null;
    last?: number | null;
  }) => {
    await fetchPromocodes({
      variables: {
        ...(args || {}),
        slug: training.slug,
      },
    });
  };

  const connection = queryResults.data
    ? queryResults.data.training.promocodes
    : training.promocodes;

  return (
    <Column gutter={16}>
      <EmailDiscount entity={training} entityType="training" />
      <ButtonWithModal title="Создать промокод" size="small">
        {({ close }) => (
          <CreatePromocodeModal close={close} trainingId={training.id} />
        )}
      </ButtonWithModal>
      {training.promocodes.edges.length === 0 ? null : (
        <PromocodesCollection
          connection={connection}
          fetchPage={fetchPage}
          total={training.promocodes_count}
        />
      )}
    </Column>
  );
};
