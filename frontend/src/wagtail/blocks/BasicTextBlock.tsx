import { RichText } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { BasicTextBlockFragment as Props } from './fragments.generated';

export default function BasicParagraphBlock(block: Props) {
  return (
    <PaddedBlock>
      <RichText
        dangerouslySetInnerHTML={{ __html: block.basic_text.text }}
        style={{ textAlign: block.basic_text.centered ? 'center' : 'left' }}
      />
    </PaddedBlock>
  );
}
