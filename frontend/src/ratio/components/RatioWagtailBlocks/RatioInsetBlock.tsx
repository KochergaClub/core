import styled from 'styled-components';

import { RatioInsetBlockFragment as Props } from './fragments.generated';

const Paragraph = styled.div`
  padding-left: 12px;
  padding-right: 12px;

  border: 1px solid #999;
  background-color: #eee;

  font-style: italic;
  text-align: justify;

  page-break-inside: avoid;
`;

export default function RatioInsetBlock(block: Props) {
  return <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />;
}
