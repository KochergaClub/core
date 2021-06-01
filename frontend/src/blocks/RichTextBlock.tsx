import { PaddedBlock } from '~/components';
import { RichText } from '~/frontkit';

interface Props {
  html: string;
}

const RichTextBlock: React.FC<Props> = ({ html }) => (
  <PaddedBlock>
    <RichText dangerouslySetInnerHTML={{ __html: html }} />
  </PaddedBlock>
);

export default RichTextBlock;
