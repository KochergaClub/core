import { gql } from '@apollo/client';
import { Column, RichText } from '~/frontkit';

import { HintCard, PaddedBlock } from '~/components';
import { BlockComponent } from '~/wagtail/types';

import { BasicCardBlockFragment as Props } from './index.generated';

const BasicCardBlock: BlockComponent<Props> = (block) => {
  return (
    <PaddedBlock>
      <Column centered stretch>
        <HintCard>
          <RichText dangerouslySetInnerHTML={{ __html: block.value }} />
        </HintCard>
      </Column>
    </PaddedBlock>
  );
};

BasicCardBlock.fragment = gql`
  fragment BasicCardBlock on BasicCardBlock {
    id
    value
  }
`;

export default BasicCardBlock;
