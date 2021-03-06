import { useCallback, useContext } from 'react';

import { ButtonWithModal } from '~/components';
import { isKnownBlock } from '~/wagtail/blocks';

import { AnyBlockFragment } from '../../types';
import { BlockFormModal } from '../BlockFormModal';
import { EditBlocksContext } from '../EditWagtailBlocks';

interface Props {
  block: AnyBlockFragment;
}

const EditButton: React.FC<Props> = ({ block }) => {
  const { dispatch } = useContext(EditBlocksContext);

  const save = useCallback(
    async (newBlock: AnyBlockFragment) => {
      dispatch({
        type: 'EDIT_BLOCK',
        payload: {
          ...newBlock,
          id: block.id,
        },
      });
    },
    [dispatch, block.id]
  );

  if (!isKnownBlock(block)) {
    return <div>Ошибка: неизвестный блок {block.__typename}</div>;
  }

  return (
    <ButtonWithModal title="Редактировать" size="small">
      {({ close }) => (
        <BlockFormModal
          modalTitle={`Редактирование блока ${block.__typename}`}
          post={save}
          typename={block.__typename}
          block={block}
          close={close}
        />
      )}
    </ButtonWithModal>
  );
};

export default EditButton;
