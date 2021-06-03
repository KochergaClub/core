import { useHover } from '~/common/hooks';

import { AnyBlockFragment } from '../../types';
import { BlockWithControls } from '../BlockWithControls';
import { WagtailStreamFieldValidationErrorFragment } from '../queries.generated';
import { AddControls } from './AddControls';
import Controls from './Controls';

type BlockValidationError = NonNullable<
  WagtailStreamFieldValidationErrorFragment['block_errors'][0]['error']
>;

interface Props {
  block: AnyBlockFragment;
  position: number;
  total?: number;
  validation_error?: BlockValidationError;
}

const ValidationError: React.FC<{
  error: BlockValidationError;
}> = ({ error }) => {
  return (
    <div className="absolute bottom-1 right-1 bg-accent-500 rounded px-4 py-2">
      {error.error_message}
    </div>
  );
};

export const EditBlockWrapper: React.FC<Props> = ({
  block,
  position,
  total,
  validation_error,
  children,
}) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef}>
      <BlockWithControls
        renderControls={() => (
          <Controls
            block={block}
            position={position}
            total={total}
            showControls={isHovered}
          />
        )}
      >
        {children}
        {validation_error ? <ValidationError error={validation_error} /> : null}
        <AddControls show={isHovered} position={position + 1} />
      </BlockWithControls>
    </div>
  );
};
