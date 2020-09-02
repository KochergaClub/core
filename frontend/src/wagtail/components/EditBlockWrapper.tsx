import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { gql, useApolloClient } from '@apollo/client';
import { Button, colors, Row } from '@kocherga/frontkit';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { AnyFormValues } from '~/components/forms/types';

import { allBlockComponents, isKnownBlock } from '../blocks';
import { useBlockStructureLoader } from '../hooks';
import { AnyBlockFragment, StructureFragment } from '../types';
import { blockToParams, structureToShape, typenameToBackendBlockName } from '../utils';
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

const EditButton: React.FC<Props & { structure: StructureFragment }> = ({
  block,
  structure,
}) => {
  const { dispatch } = useContext(EditBlocksContext);

  const shape = structureToShape(structure);

  const valueWrappedInForm =
    structure.__typename !== 'WagtailStructBlockStructure';

  const blockParams = (valueWrappedInForm
    ? {
        form: blockToParams(structure, block),
      }
    : blockToParams(structure, block)) as AnyFormValues | undefined;

  const apolloClient = useApolloClient();

  const save = useCallback(
    async (v: AnyFormValues) => {
      const value = valueWrappedInForm ? v.form : v;

      if (!isKnownBlock(block)) {
        throw new Error(`Block ${block.__typename} is unknown`);
      }
      const blockComponent = allBlockComponents[block.__typename];
      const renderBlockQuery = gql`
        query RenderBlock($type: String!, $paramsJson: String!) {
          result: wagtailRenderBlock(input: {type: $type, paramsJson: $paramsJson}) {
            validation_error {
              non_block_error
              block_errors {
                error_message
              }
            }
            block {
              ...${block.__typename}
            }
          }
        }
        ${blockComponent.fragment}
      `;

      const type = typenameToBackendBlockName(block.__typename);
      const { data } = await apolloClient.query({
        query: renderBlockQuery,
        variables: {
          type,
          paramsJson: JSON.stringify(value),
        },
      });
      if (!data.result) {
        throw new Error('Query for rendered block failed');
      }
      if (data.result.validation_error) {
        throw new Error(
          `Render error: ${JSON.stringify(data.result.validation_error)}`
        );
      }
      if (!data.result.block) {
        throw new Error("Couldn't find block in wagtailRenderBlock results");
      }
      dispatch({
        type: 'EDIT_BLOCK',
        payload: {
          ...data.result.block,
          id: block.id,
        },
      });
    },
    [apolloClient, dispatch, block, valueWrappedInForm]
  );

  return (
    <ModalFormButton
      small
      initialValues={blockParams}
      shape={shape}
      buttonName="Редактировать"
      modalButtonName="Сохранить"
      modalTitle="Редактирование блока"
      post={save}
    />
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

  return (
    <Row>
      <Button size="small" onClick={deleteCb}>
        удалить
      </Button>
      {structure ? (
        <EditButton structure={structure} block={block} />
      ) : (
        <div>Loading...</div>
      )}
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
