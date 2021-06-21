// Stream of Wagtail blocks rendered in order based on their type.
import dynamic from 'next/dynamic';
import { useCallback, useContext, useEffect } from 'react';

import { WagtailPageContext } from '~/cms/contexts';
import { Spinner } from '~/components';

import { useEditWagtailPage } from '../hooks';
import { AnyBlockFragment } from '../types';
import AnyBlock from './AnyBlock';

const EditWagtailBlocks = dynamic(
  async () => (await import('./EditWagtailBlocks')).EditWagtailBlocks,
  {
    loading: () => <Spinner size="block" />, // eslint-disable-line react/display-name
  }
);
const PreviewWagtailBlocks = dynamic(() => import('./PreviewWagtailBlocks'), {
  loading: () => <Spinner size="block" />, // eslint-disable-line react/display-name
});

const ViewWagtailBlocks: React.FC<Props> = ({ blocks }) => {
  const edit = useEditWagtailPage();

  const editHotkey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'e' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        edit();
      }
    },
    [edit]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', editHotkey);
    return () => {
      document.body.removeEventListener('keydown', editHotkey);
    };
  }, [editHotkey]);

  return (
    <div>
      {blocks.map((block) => (
        <div key={block.id}>
          <AnyBlock {...block} />
        </div>
      ))}
    </div>
  );
};

interface Props {
  blocks: AnyBlockFragment[];
}

export const WagtailBlocks: React.FC<Props> = ({ blocks }) => {
  const {
    state: { editing, preview },
  } = useContext(WagtailPageContext);

  if (editing) {
    return <EditWagtailBlocks blocks={blocks} />;
  } else if (preview) {
    return <PreviewWagtailBlocks blocks={blocks} />;
  } else {
    return <ViewWagtailBlocks blocks={blocks} />;
  }
};
