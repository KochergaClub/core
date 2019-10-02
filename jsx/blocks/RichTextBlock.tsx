import styled from 'styled-components';

import { RichText } from '@kocherga/frontkit';

const Container = styled(RichText)`
  margin: 40px auto;
  max-width: 800px;
  padding: 0 20px;
`;

interface Props {
  html: string;
}

const RichTextBlock: React.FC<Props> = ({ html }) => (
  <Container dangerouslySetInnerHTML={{ __html: html }} />
);

export default RichTextBlock;
