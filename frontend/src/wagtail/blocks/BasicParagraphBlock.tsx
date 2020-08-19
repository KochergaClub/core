import { RichText } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { BasicParagraphBlockFragment as Props } from './fragments.generated';

export default function BasicParagraphBlock(block: Props) {
  return (
    <PaddedBlock>
      <RichText dangerouslySetInnerHTML={{ __html: block.value }} />
    </PaddedBlock>
  );
}
