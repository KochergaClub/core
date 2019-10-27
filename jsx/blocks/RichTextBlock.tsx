import { RichText } from '@kocherga/frontkit';

import PaddedBlock from '~/components/PaddedBlock';

interface Props {
  html: string;
}

const RichTextBlock: React.FC<Props> = ({ html }) => (
  <PaddedBlock>
    <RichText dangerouslySetInnerHTML={{ __html: html }} />
  </PaddedBlock>
);

export default RichTextBlock;
