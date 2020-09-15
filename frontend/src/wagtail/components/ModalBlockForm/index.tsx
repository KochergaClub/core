import { useCallback, useEffect, useMemo, useState } from 'react';

import { gql, useApolloClient } from '@apollo/client';
import { Modal } from '@kocherga/frontkit';

import { Spinner } from '~/components';
import ModalForm from '~/components/forms/ModalForm';
import { AnyFormValues, FormShape } from '~/components/forms/types';

import { allBlockComponents, KnownBlockFragment } from '../../blocks';
import { useBlockStructureLoader } from '../../hooks';
import { StructureFragment } from '../../types';
import { blockToParams, structureToShape, typenameToBackendBlockName } from '../../utils';
import {
    WagtailBlockValidationError_L0Fragment, WagtailBlockValidationError_L1Fragment,
    WagtailBlockValidationError_L2Fragment, WagtailBlockValidationError_L3Fragment,
    WagtailBlockValidationError_L3FragmentDoc
} from './fragments.generated';

interface Props {
  block?: KnownBlockFragment;
  typename: KnownBlockFragment['__typename'];
  post: (block: KnownBlockFragment) => Promise<unknown>;
  close: () => void;
  modalTitle: string;
}

const validationErrorToFormErrors = (
  error:
    | WagtailBlockValidationError_L3Fragment
    | WagtailBlockValidationError_L2Fragment
    | WagtailBlockValidationError_L1Fragment
    | WagtailBlockValidationError_L0Fragment
): any => {
  switch (error.__typename) {
    case 'WagtailStructBlockValidationError':
      if (!('errors' in error)) {
        throw new Error('Too deeply nested validation error');
      }
      return Object.fromEntries(
        (error.errors as any[]).map((field) => {
          return [field.name, validationErrorToFormErrors(field.error)];
        })
      );
    case 'WagtailListBlockValidationError':
      if (!('list_errors' in error)) {
        throw new Error('Too deeply nested validation error');
      }
      return (error.list_errors as any[]).map(
        (subError) => (subError ? validationErrorToFormErrors(subError) : '') // list errors can be null, that's normal
      );
      return;
    case 'WagtailAnyBlockValidationError':
      return error.error_message;
  }
};

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
                error {
                  ...WagtailBlockValidationError_L3
                }
              }
            }
            block {
              ...${typename}
            }
          }
        }
        ${blockComponent.fragment}
        ${WagtailBlockValidationError_L3FragmentDoc}
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
        const error = data.result.validation_error;
        if (error.non_block_error) {
          throw new Error(`Non-block error: ${error.non_block_error}`);
        }
        if (error.block_errors.length === 1) {
          const innerError = error.block_errors[0]
            .error as WagtailBlockValidationError_L3Fragment;
          return {
            close: false,
            formErrors: validationErrorToFormErrors(innerError),
            error: 'Server-side validation error',
          };
        }
        throw new Error(
          `Validation error: ${JSON.stringify(data.result.validation_error)}`
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
    // TODO - don't render anything until delay (how to do this? extract appear logic from Spinner and put it into a separate HOC?)
    return (
      <Modal isOpen={true}>
        <Spinner size="div" />
      </Modal>
    );
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
