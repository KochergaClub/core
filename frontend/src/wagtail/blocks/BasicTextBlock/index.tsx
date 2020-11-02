import { gql } from '@apollo/client';
import { RichText } from '~/frontkit';

import { PaddedBlock } from '~/components';
import { BlockComponent } from '~/wagtail/types';

import { BasicTextBlockFragment as Props } from './index.generated';

const BasicTextBlock: BlockComponent<Props> = (block) => {
  return (
    <PaddedBlock>
      <RichText
        dangerouslySetInnerHTML={{ __html: block.basic_text.text }}
        style={{ textAlign: block.basic_text.centered ? 'center' : 'left' }}
      />
    </PaddedBlock>
  );
};

BasicTextBlock.fragment = gql`
  fragment BasicTextBlock on BasicTextBlock {
    id
    basic_text: value {
      text
      centered
    }
  }
`;

export default BasicTextBlock;
