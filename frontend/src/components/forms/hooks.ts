import { useCallback } from 'react';

import { TypedDocumentNode } from '@apollo/client';

import { SmartMutationResult, useSmartMutation } from '~/common/hooks';

import { ModalPostResult } from './types';

type Options = Parameters<typeof useSmartMutation>[1];

export const useFormModalSmartMutation = <V>(
  document: TypedDocumentNode<SmartMutationResult, V>,
  options: Options
) => {
  const originalCb = useSmartMutation(document, options);

  const cb = useCallback(
    async (params: { variables: V }): Promise<ModalPostResult> => {
      const originalResult = await originalCb(params);
      return {
        close: originalResult.ok,
        error: originalResult.error,
        fieldErrors: originalResult.fieldErrors
          ? Object.fromEntries(
              Object.keys(originalResult.fieldErrors).map((k) => [
                k,
                {
                  type: 'manual',
                  message: originalResult.fieldErrors![k],
                },
              ])
            )
          : undefined,
      };
    },
    [originalCb]
  );

  return cb;
};
