import React from 'react';

import { useLazyQuery } from '@apollo/client';

import { PaddedBlock } from '~/components';
import { Column } from '~/frontkit';

import { RatioTrainingFragment } from '../../queries.generated';
import EmailDiscount from '../promocodes/EmailDiscount';
import PromocodesCollection from '../promocodes/PromocodesCollection';
import { RatioTrainingPromocodesPageDocument } from './queries.generated';

interface Props {
  training: RatioTrainingFragment;
}

export const TrainingPromocodesBlock: React.FC<Props> = ({ training }) => {
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

  if (training.promocodes.edges.length === 0) {
    return null;
  }

  const connection = queryResults.data
    ? queryResults.data.training.promocodes
    : training.promocodes;

  return (
    <PaddedBlock>
      <Column gutter={16}>
        <EmailDiscount entity={training} entityType="training" />
        <PromocodesCollection
          connection={connection}
          fetchPage={fetchPage}
          total={training.promocodes_count}
        />
      </Column>
    </PaddedBlock>
  );
};
