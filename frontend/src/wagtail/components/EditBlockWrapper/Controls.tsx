import { useContext } from 'react';

import { Button, Row } from '@kocherga/frontkit';

import { AnyBlockFragment } from '../../types';
import { EditBlocksContext } from '../EditWagtailBlocks';
import EditButton from './EditButton';

interface Props {
  block: AnyBlockFragment;
  position?: number;
  total?: number;
}

const Controls: React.FC<Props> = ({ block, position, total }) => {
  const { dispatch } = useContext(EditBlocksContext);
  const deleteCb = () => {
    dispatch({ type: 'DELETE_BLOCK', payload: block.id });
  };

  return (
    <Row>
      <Button size="small" onClick={deleteCb}>
        Удалить
      </Button>
      <EditButton block={block} />
      {position !== undefined && position > 0 ? (
        <Button
          size="small"
          onClick={() =>
            dispatch({
              type: 'SWAP_BLOCKS',
              payload: { first: position, second: position - 1 },
            })
          }
        >
          &uarr;
        </Button>
      ) : null}
      {position !== undefined && total !== undefined && position < total - 1 ? (
        <Button
          size="small"
          onClick={() =>
            dispatch({
              type: 'SWAP_BLOCKS',
              payload: { first: position, second: position + 1 },
            })
          }
        >
          &darr;
        </Button>
      ) : null}
    </Row>
  );
};

export default Controls;
