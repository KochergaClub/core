import styled from 'styled-components';

import { gql } from '@apollo/client';
import { fonts, RichText } from '~/frontkit';

import { PaddedBlock } from '~/components';
import { BlockComponent } from '~/wagtail/types';

import { BasicLeadBlockFragment as Props } from './index.generated';

const Paragraph = styled(RichText)`
  text-align: center;
  font-size: ${fonts.sizes.L};
`;

const BasicLeadBlock: BlockComponent<Props> = (block) => {
  return (
    <PaddedBlock>
      <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />
    </PaddedBlock>
  );
};

BasicLeadBlock.fragment = gql`
  fragment BasicLeadBlock on BasicLeadBlock {
    id
    value
  }
`;

export default BasicLeadBlock;
