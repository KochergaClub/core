import { useCallback, useEffect, useMemo, useState } from 'react';

import { gql, useApolloClient } from '@apollo/client';

import ModalForm from '~/components/forms/ModalForm';
import { AnyFormValues, FormShape } from '~/components/forms/types';

import { allBlockComponents, KnownBlockFragment } from '../../blocks';
import { useBlockStructureLoader } from '../../hooks';
import { StructureFragment } from '../../types';
import { blockToParams, structureToShape, typenameToBackendBlockName } from '../../utils';

interface Props {
  block?: KnownBlockFragment;
  typename: KnownBlockFragment['__typename'];
  post: (block: KnownBlockFragment) => Promise<unknown>;
  close: () => void;
  modalTitle: string;
}

const ModalBlockForm: React.FC<Props> = ({
  block,
  typename,
  post,
  close,
  modalTitle,
}) => {
  const structureLoader = useBlockStructureLoader();
  const [structure, setStructure] = useState<StructureFragment | undefined>();

  useEffect(() => {
    (async () => {
      setStructure(await structureLoader(typename));
    })();
  }, [typename, structureLoader]);

  if (block && block.__typename !== typename) {
    throw new Error('Block typename should match typename');
  }

  const shape: FormShape | undefined = useMemo(
    () => (structure ? structureToShape(structure) : undefined),
    [structure]
  );

  const valueWrappedInForm = useMemo(
    () => structure && structure.__typename !== 'WagtailStructBlockStructure',
    [structure]
  );

  const blockParams = useMemo(() => {
    if (!structure || !block) {
      return;
    }
    return (valueWrappedInForm
      ? {
          form: blockToParams(structure, block),
        }
      : blockToParams(structure, block)) as AnyFormValues | undefined;
  }, [structure, block, valueWrappedInForm]);

  const apolloClient = useApolloClient();

  const save = useCallback(
    async (v: AnyFormValues) => {
      const value = valueWrappedInForm ? v.form : v;

      const blockComponent = allBlockComponents[typename];
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
              ...${typename}
            }
          }
        }
        ${blockComponent.fragment}
      `;

      const type = typenameToBackendBlockName(typename);
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
      await post(data.result.block);
    },
    [apolloClient, typename, valueWrappedInForm, post]
  );

  if (!shape) {
    return <div>loading...</div>;
  }

  return (
    <ModalForm
      initialValues={blockParams}
      shape={shape}
      modalButtonName="Сохранить"
      modalTitle={modalTitle}
      post={save}
      close={close}
    />
  );
};

export default ModalBlockForm;
