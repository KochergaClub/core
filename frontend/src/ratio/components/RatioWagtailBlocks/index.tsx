import DebugBlock from '~/wagtail/components/DebugBlock';

import { RatioSectionPageFragment } from '../../wagtail/fragments.generated';
import RatioBriefingBlock from './RatioBriefingBlock';
import RatioExerciseBlock from './RatioExerciseBlock';
import RatioExerciseOnelineBlock from './RatioExerciseOnelineBlock';
import RatioHeaderBlock from './RatioHeaderBlock';
import RatioInsetBlock from './RatioInsetBlock';
import RatioMathBlock from './RatioMathBlock';
import RatioParagraphBlock from './RatioParagraphBlock';

type AnyRatioBlockFragment = RatioSectionPageFragment['body'][0];

interface Props {
  blocks: AnyRatioBlockFragment[];
}

const AnyBlock = (block: AnyRatioBlockFragment) => {
  switch (block.__typename) {
    case 'RatioBriefingBlock':
      return <RatioBriefingBlock {...block} />;
    case 'RatioHeaderBlock':
      return <RatioHeaderBlock {...block} />;
    case 'RatioParagraphBlock':
      return <RatioParagraphBlock {...block} />;
    case 'RatioInsetBlock':
      return <RatioInsetBlock {...block} />;
    case 'RatioExerciseBlock':
      return <RatioExerciseBlock {...block} />;
    case 'RatioExerciseOnelineBlock':
      return <RatioExerciseOnelineBlock {...block} />;
    case 'RatioMathBlock':
      return <RatioMathBlock {...block} />;
    default:
      return <DebugBlock typename={block.__typename || 'UNKNOWN'} />;
  }
};

export default function WagtailBlocks({ blocks }: Props) {
  return (
    <div>
      {blocks.map((block) => (
        <AnyBlock key={block.id} {...block} />
      ))}
    </div>
  );
}
