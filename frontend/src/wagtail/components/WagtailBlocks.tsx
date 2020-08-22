// Stream of Wagtail blocks rendered in order based on their type.

import { useContext } from 'react';

import { WagtailPageContext } from '~/cms/contexts';

import { AnyBlockFragment } from '../types';
import AnyBlock from './AnyBlock';
import EditWagtailBlocks from './EditWagtailBlocks';
// wrappers for different modes
// TODO - load dynamically?
import PreviewBlockWrapper from './PreviewBlockWrapper';

interface Props {
  blocks: AnyBlockFragment[];
}

const ViewBlockWrapper: React.FC<{ block: AnyBlockFragment }> = ({
  children,
}) => {
  // TODO - wrap in <div> or <section> for parity with other modes?
  return <>{children}</>;
};

export default function WagtailBlocks({ blocks }: Props) {
  const {
    state: { editing, preview },
  } = useContext(WagtailPageContext);

  if (editing) {
    // too complicated to be replaced with ModeWrapper pattern below
    // for example, EditWagtailBlocks creates an editable copy of all blocks
    return <EditWagtailBlocks blocks={blocks} />;
  }

  const ModeWrapper = preview ? PreviewBlockWrapper : ViewBlockWrapper;

  return (
    <div>
      {blocks.map((block) => (
        <ModeWrapper key={block.id} block={block}>
          <AnyBlock {...block} />
        </ModeWrapper>
      ))}
    </div>
  );
}
