import clsx from 'clsx';
import { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { Button, Row } from '~/frontkit';

import { AnyBlockFragment } from '../../types';
import { EditBlocksContext } from '../EditWagtailBlocks';
import EditButton from './EditButton';

interface Props {
  block: AnyBlockFragment;
  position?: number;
  total?: number;
  showControls: boolean;
}

const Controls: React.FC<Props> = ({
  block,
  position,
  total,
  showControls,
}) => {
  const { dispatch } = useContext(EditBlocksContext);
  const deleteCb = () => {
    dispatch({ type: 'DELETE_BLOCK', payload: block.id });
  };

  return (
    <div
      className={clsx('flex items-center space-x-1', showControls || 'hidden')}
    >
      <Button size="small" onClick={deleteCb}>
        <Row vCentered>
          <FaTrashAlt />
          <span>Удалить</span>
        </Row>
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
      <div className="text-xs bg-gray-400 text-white px-2 rounded-full">
        {block.__typename}
      </div>
    </div>
  );
};

export default Controls;
