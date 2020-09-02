import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, colors, Row } from '@kocherga/frontkit';

import ModalFormButton from '~/components/forms/ModalFormButton';

import { useBlockStructureLoader } from '../hooks';
import { AnyBlockFragment, StructureFragment } from '../types';
import { getBlockValueKey, structureToShape } from '../utils';
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

  const structureLoader = useBlockStructureLoader();
  const [structure, setStructure] = useState<StructureFragment | undefined>();

  useEffect(() => {
    (async () => {
      setStructure(await structureLoader(block));
    })();
  }, [block, structureLoader]);

  if (!structure) {
    return <Row>Loading...</Row>;
  }

  const shape = structureToShape(structure);
  const valueKey = getBlockValueKey(block);
  let blockValue = valueKey ? (block as any)[valueKey] : undefined;

  const valueWrappedInForm =
    structure.__typename === 'WagtailListBlockStructure';
  if (valueWrappedInForm) {
    blockValue = {
      form: blockValue,
    };
  }

  return (
    <Row>
      <Button size="small" onClick={deleteCb}>
        удалить
      </Button>
      <ModalFormButton
        small
        initialValues={blockValue}
        shape={shape}
        buttonName="Редактировать"
        modalButtonName="Сохранить"
        modalTitle="Редактирование блока"
        post={async (v) => {
          const value = valueWrappedInForm ? v.form : v;
          dispatch({
            type: 'EDIT_BLOCK',
            payload: {
              id: block.id,
              value,
            },
          });
        }}
      />
    </Row>
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
