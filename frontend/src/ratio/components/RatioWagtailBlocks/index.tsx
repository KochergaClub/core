import { RatioSectionPageFragment } from '../../wagtail/fragments.generated';

type AnyRatioBlockFragment = RatioSectionPageFragment['body'][0];

interface Props {
  blocks: AnyRatioBlockFragment[];
}

import RatioBriefingBlock from './RatioBriefingBlock';
import RatioHeaderBlock from './RatioHeaderBlock';
import RatioParagraphBlock from './RatioParagraphBlock';
import RatioInsetBlock from './RatioInsetBlock';
import RatioExerciseBlock from './RatioExerciseBlock';
import RatioExerciseOnelineBlock from './RatioExerciseOnelineBlock';
import RatioMathBlock from './RatioMathBlock';

import DebugBlock from '~/wagtail/blocks/DebugBlock';

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
      {blocks.map(block => (
        <AnyBlock key={block.id} {...block} />
      ))}
    </div>
  );
}
