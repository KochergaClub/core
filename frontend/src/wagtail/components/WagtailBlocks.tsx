// Stream of Wagtail blocks rendered in order based on their type.
import dynamic from 'next/dynamic';
import { useContext } from 'react';

import { WagtailPageContext } from '~/cms/contexts';
import { Spinner } from '~/components';

import { AnyBlockFragment } from '../types';
import AnyBlock from './AnyBlock';

const EditWagtailBlocks = dynamic(() => import('./EditWagtailBlocks'), {
  loading: () => <Spinner size="block" />, // eslint-disable-line react/display-name
});
const PreviewWagtailBlocks = dynamic(() => import('./PreviewWagtailBlocks'), {
  loading: () => <Spinner size="block" />, // eslint-disable-line react/display-name
});

interface Props {
  blocks: AnyBlockFragment[];
}

export default function WagtailBlocks({ blocks }: Props) {
  const {
    state: { editing, preview },
  } = useContext(WagtailPageContext);

  if (editing) {
    return <EditWagtailBlocks blocks={blocks} />;
  } else if (preview) {
    return <PreviewWagtailBlocks blocks={blocks} />;
  } else {
    return (
      <div>
        {blocks.map((block) => (
          <div key={block.id}>
            <AnyBlock {...block} />
          </div>
        ))}
      </div>
    );
  }
}
