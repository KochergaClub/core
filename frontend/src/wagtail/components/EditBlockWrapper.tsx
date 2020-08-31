import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, colors, Row } from '@kocherga/frontkit';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormField, FormShape } from '~/components/forms/types';

import { useBlockStructureLoader } from '../hooks';
import { AnyBlockFragment, StructureFragment } from '../types';
import { getBlockValueKey } from '../utils';
import ControlledBlockContainer from './ControlledBlockContainer';
import { EditBlocksContext } from './EditWagtailBlocks';
import {
    StructureL0Fragment, StructureL1Fragment, StructureL2Fragment, StructureL3Fragment,
    WagtailBlockValidationErrorFragment
} from './queries.generated';

interface Props {
  block: AnyBlockFragment;
  validation_error?: WagtailBlockValidationErrorFragment;
}

const structureToFormField = (
  structure:
    | StructureL0Fragment
    | StructureL1Fragment
    | StructureL2Fragment
    | StructureL3Fragment,
  name: string
): FormField => {
  switch (structure.__typename) {
    case 'WagtailCharBlockStructure':
    case 'WagtailURLBlockStructure':
    case 'WagtailRichTextBlockStructure':
      return {
        type: 'string',
        name,
      };
    case 'WagtailBooleanBlockStructure':
      return {
        type: 'boolean',
        name,
      };
    case 'WagtailImageBlockStructure':
      return {
        type: 'number',
        name,
      };
    case 'WagtailStaticBlockStructure':
      return {
        type: 'string',
        name,
        readonly: true,
        default: 'static', // FIXME
      };
    case 'WagtailStructBlockStructure':
      if (!('child_blocks' in structure)) {
        throw new Error('Structure is too deeply nested');
      }

      // we can't just map on child_blocks since typescript is not smart enough
      const structShape: FormField[] = [];
      for (const child_block of structure.child_blocks) {
        structShape.push(
          structureToFormField(child_block.definition, child_block.name)
        );
      }
      return {
        type: 'shape',
        name,
        shape: structShape,
      };
    case 'WagtailListBlockStructure':
      if (!('child_block' in structure)) {
        throw new Error('Structure is too deeply nested');
      }
      return {
        type: 'list',
        name,
        field: structureToFormField(structure.child_block, 'item'),
      };
  }
};

const structureToShape = (structure: StructureFragment): FormShape => {
  const formField = structureToFormField(structure, 'form');
  if (formField.type === 'shape') {
    return formField.shape;
  } else {
    return [formField];
  }
};

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
