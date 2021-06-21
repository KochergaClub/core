import { AnyBlockFragment } from '../types';
import { AnyBlock } from './AnyBlock';
import { PreviewBlockWrapper } from './PreviewBlockWrapper';

interface Props {
  blocks: AnyBlockFragment[];
}

export const PreviewWagtailBlocks: React.FC<Props> = ({ blocks }: Props) => {
  return (
    <div>
      {blocks.map((block) => (
        <PreviewBlockWrapper key={block.id} block={block}>
          <AnyBlock {...block} />
        </PreviewBlockWrapper>
      ))}
    </div>
  );
};
