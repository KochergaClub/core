import { useContext } from 'react';
import styled from 'styled-components';

import { Button, colors } from '@kocherga/frontkit';

import { AnyBlockFragment } from '../types';
import ControlledBlockContainer from './ControlledBlockContainer';
import { EditBlocksContext } from './EditWagtailBlocks';
import { WagtailBlockValidationErrorFragment } from './queries.generated';

interface Props {
  block: AnyBlockFragment;
  validation_error?: WagtailBlockValidationErrorFragment;
}

const ValidationErrorContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${colors.accent[700]};
  color: black;
  /* color: ${colors.accent[700]}; */
  padding: 4px 8px;
`;

const ValidationError: React.FC<{
  error: WagtailBlockValidationErrorFragment;
}> = ({ error }) => {
  return (
    <ValidationErrorContainer>{error.error_message}</ValidationErrorContainer>
  );
};

const Controls: React.FC<Props> = ({ block }) => {
  const { dispatch } = useContext(EditBlocksContext);
  const deleteCb = () => {
    dispatch({ type: 'DELETE_BLOCK', payload: block.id });
  };
  return (
    <Button small onClick={deleteCb}>
      удалить
    </Button>
  );
};

const EditBlockWrapper: React.FC<Props> = ({
  block,
  validation_error,
  children,
}) => {
  return (
    <ControlledBlockContainer controls={Controls} block={block}>
      {children}
      {validation_error && <ValidationError error={validation_error} />}
    </ControlledBlockContainer>
  );
};

export default EditBlockWrapper;
