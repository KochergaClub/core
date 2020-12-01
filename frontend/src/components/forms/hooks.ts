import { GraphQLError } from 'graphql';
import { useCallback } from 'react';

import { TypedDocumentNode, useMutation } from '@apollo/client';

import { GenericErrorFragment, ValidationErrorFragment } from '~/apollo/common-fragments.generated';

import { ModalPostResult } from './types';

export type SmartMutationResult = {
  result:
    | {
        __typename: string;
      }
    | ({ __typename: 'ValidationError' } & ValidationErrorFragment)
    | ({ __typename: 'GenericError' } & GenericErrorFragment);
};

export const useFormModalSmartMutation = <V>(
  document: TypedDocumentNode<SmartMutationResult, V>,
  {
    refetchQueries,
    expectedTypename,
  }: {
    refetchQueries?: string[];
    expectedTypename: string;
  }
) => {
  const [mutationCb] = useMutation(document, {
    refetchQueries,
    awaitRefetchQueries: true,
  });

  const cb = useCallback(
    async ({ variables }: { variables: V }): Promise<ModalPostResult> => {
      let mutationResult: ReturnType<typeof mutationCb> extends Promise<infer R>
        ? R | undefined
        : never;
      try {
        mutationResult = await mutationCb({
          variables,
        });
      } catch (e) {
        const errors = e.graphQLErrors as GraphQLError[];

        const error = errors.length
          ? errors.map((e) => e.message || 'Неизвестная ошибка').join('. ')
          : String(e);

        return {
          close: false,
          error,
        };
      }

      if (!mutationResult) {
        return {
          close: false,
          error: 'Неизвестная ошибка',
        };
      }
      const { data } = mutationResult;
      if (!data) {
        return {
          close: false,
          error: 'Неизвестная ошибка',
        };
      }
      if (data.result.__typename === expectedTypename) {
        return; // great, mutation succeeded
      }

      switch (data.result.__typename) {
        case 'ValidationError':
          return {
            close: false,
            fieldErrors: Object.fromEntries(
              (data.result as ValidationErrorFragment).errors.map((error) => [
                error.name,
                {
                  type: 'manual',
                  message: error.messages.join('. '),
                },
              ])
            ),
          };
        case 'GenericError':
          return {
            close: false,
            error: (data.result as GenericErrorFragment).message,
          };
        default:
          return {
            close: false,
            error: 'Неизвестная ошибка',
          };
      }
    },
    [mutationCb, expectedTypename]
  );

  return cb;
};
