import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldError } from 'react-hook-form';

import { gql, TypedDocumentNode, useApolloClient } from '@apollo/client';

import { dedupeFragments } from '~/common/dedupeFragments';
import { withFragments } from '~/common/utils';
import { Spinner } from '~/components';
import { FormShapeModal } from '~/components/forms';
import { AnyFormValues, FormShape } from '~/components/forms/types';
import { Modal } from '~/frontkit';

import { allBlockComponents, KnownBlockFragment } from '../../blocks';
import { useBlockStructureLoader } from '../../hooks';
import { StructureFragment } from '../../types';
import { blockToParams, structureToShape, typenameToBackendBlockName } from '../../utils';
import {
    WagtailBlockValidationError_L0Fragment, WagtailBlockValidationError_L1Fragment,
    WagtailBlockValidationError_L2Fragment, WagtailBlockValidationError_L3Fragment,
    WagtailBlockValidationError_L3FragmentDoc
} from './fragments.generated';

const validationErrorToFieldErrors = (
  error:
    | WagtailBlockValidationError_L3Fragment
    | WagtailBlockValidationError_L2Fragment
    | WagtailBlockValidationError_L1Fragment
    | WagtailBlockValidationError_L0Fragment,
  path = ''
): Record<string, FieldError> => {
  const result: Record<string, FieldError> = {};
  const updateResult = (childErrors: Record<string, FieldError>) => {
    Object.keys(childErrors).forEach((key) => {
      result[key] = childErrors[key];
    });
  };

  switch (error.__typename) {
    case 'WagtailStructBlockValidationError':
      if (!('errors' in error)) {
        throw new Error('Too deeply nested validation error');
      }
      const prefix = path ? path + '.' : '';
      (error.errors as any[]).forEach((field) => {
        updateResult(
          validationErrorToFieldErrors(field.error, `${prefix}${field.name}`)
        );
      });
      return result;
    case 'WagtailListBlockValidationError':
      if (!('list_errors' in error)) {
        throw new Error('Too deeply nested validation error');
      }
      (error.list_errors as any[]).forEach((subError, i) => {
        // list errors can be null, that's normal
        if (subError) {
          updateResult(validationErrorToFieldErrors(subError, `${path}[${i}]`));
        }
      });
      return result;
    case 'WagtailAnyBlockValidationError':
      return {
        [path]: { type: 'manual', message: error.error_message },
      };
  }
};

type RenderBlockResult<T extends KnownBlockFragment['__typename']> = {
  __typename: 'Query';
} & {
  result?: {
    validation_error?: {
      non_block_error?: string;
      block_errors: {
        error?: WagtailBlockValidationError_L3Fragment;
      }[];
    };
    block?: Parameters<typeof allBlockComponents[T]>[0];
  };
};

type RenderBlockVariables = {
  type: string;
  paramsJson: string;
};

const buildRenderBlockDocument = <T extends KnownBlockFragment['__typename']>(
  typename: T
): TypedDocumentNode<RenderBlockResult<T>, RenderBlockVariables> => {
  const blockComponent = allBlockComponents[typename];
  return dedupeFragments(
    withFragments(
      gql`
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
    `,
      [blockComponent.fragment, WagtailBlockValidationError_L3FragmentDoc]
    )
  );
};

interface Props {
  block?: KnownBlockFragment;
  typename: KnownBlockFragment['__typename'];
  post: (block: KnownBlockFragment) => Promise<unknown>;
  close: () => void;
  modalTitle: string;
}

export const BlockFormModal: React.FC<Props> = ({
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
    () =>
      structure &&
      structure.__typename !== 'WagtailStructBlockStructure' &&
      structure.__typename !== 'WagtailStaticBlockStructure',
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
    async (v: Record<string, unknown>) => {
      const value = valueWrappedInForm ? v.form : v;

      const RenderBlockDocument = buildRenderBlockDocument(typename);

      const type = typenameToBackendBlockName(typename);
      const { data } = await apolloClient.query({
        query: RenderBlockDocument,
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
            fieldErrors: validationErrorToFieldErrors(
              innerError,
              valueWrappedInForm ? 'form' : ''
            ),
            error: 'Server-side validation error', // FIXME - better russian message
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
      <Modal>
        <Spinner size="div" />
      </Modal>
    );
  }

  return (
    <FormShapeModal
      defaultValues={blockParams}
      shape={shape}
      buttonText="Сохранить"
      title={modalTitle}
      post={save}
      close={close}
    />
  );
};
