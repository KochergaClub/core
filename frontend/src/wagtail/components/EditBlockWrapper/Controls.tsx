import { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

import { Button, colors, fonts, Row } from '~/frontkit';

import { AnyBlockFragment } from '../../types';
import { EditBlocksContext } from '../EditWagtailBlocks';
import EditButton from './EditButton';

const BlockName = styled.div`
  color: white;
  background-color: ${colors.primary[300]};
  font-size: ${fonts.sizes.XS};
  padding: 0 8px;
  border-radius: 8px;
`;

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
    <Row vCentered>
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
      <BlockName>{block.__typename}</BlockName>
    </Row>
  );
};

export default Controls;
