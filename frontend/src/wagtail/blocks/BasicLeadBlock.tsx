import styled from 'styled-components';

import { RichText, fonts } from '@kocherga/frontkit';

import { BasicLeadBlockFragment as Props } from './fragments.generated';

const Paragraph = styled(RichText)`
  max-width: 1020px;
  margin: 20px auto;
  text-align: center;
  font-size: ${fonts.sizes.L};
`;

export default function BasicLeadBlock(block: Props) {
  return <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />;
}
