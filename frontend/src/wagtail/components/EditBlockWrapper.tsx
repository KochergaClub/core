import { useContext } from 'react';

import { Button } from '@kocherga/frontkit';

import { AnyBlockFragment } from '../types';
import { EditBlocksContext } from './EditWagtailBlocks';

// TODO - extract into types.ts, BlockWrapperProps?
interface Props {
  block: AnyBlockFragment;
}

const EditBlockWrapper: React.FC<Props> = ({ block, children }) => {
  const { dispatch } = useContext(EditBlocksContext);
  const deleteCb = () => {
    dispatch({ type: 'DELETE_BLOCK', payload: block.id });
  };
  return (
    <div>
      <Button small onClick={deleteCb}>
        удалить
      </Button>
      {children}
    </div>
  );
};

export default EditBlockWrapper;
