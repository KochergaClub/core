import styled from 'styled-components';

import { fonts, RichText } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { BasicLeadBlockFragment as Props } from './fragments.generated';

const Paragraph = styled(RichText)`
  text-align: center;
  font-size: ${fonts.sizes.L};
`;

export default function BasicLeadBlock(block: Props) {
  return (
    <PaddedBlock>
      <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />
    </PaddedBlock>
  );
}
