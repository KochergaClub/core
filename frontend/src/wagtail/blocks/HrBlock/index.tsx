import { gql } from '@apollo/client';
import { HR } from '~/frontkit';

import { PaddedBlock } from '~/components';

import { BlockComponent } from '../../types';
import { HrBlockFragment as Props } from './index.generated';

const HrBlock: BlockComponent<Props> = () => {
  return (
    <PaddedBlock>
      <HR />
    </PaddedBlock>
  );
};

HrBlock.fragment = gql`
  fragment HrBlock on HrBlock {
    id
  }
`;

export default HrBlock;
