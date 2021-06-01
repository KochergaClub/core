import { gql } from '@apollo/client';

import { PaddedBlock } from '~/components';
import { RichText } from '~/frontkit';
import { BlockComponent } from '~/wagtail/types';

import { BasicTextBlockFragment as Props } from './index.generated';

const BasicTextBlock: BlockComponent<Props> = (block) => {
  return (
    <PaddedBlock>
      <RichText
        dangerouslySetInnerHTML={{ __html: block.basic_text.text }}
        className={block.basic_text.centered ? 'text-center' : ''}
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
