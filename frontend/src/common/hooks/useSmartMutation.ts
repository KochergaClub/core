import { GraphQLError } from 'graphql';
import { useCallback } from 'react';

import { MutationUpdaterFn, TypedDocumentNode, useMutation } from '@apollo/client';

import { GenericErrorFragment, ValidationErrorFragment } from '~/apollo/common-fragments.generated';

export type SmartMutationResult = {
  result:
    | {
        __typename: string;
      }
    | ({ __typename: 'ValidationError' } & ValidationErrorFragment)
    | ({ __typename: 'GenericError' } & GenericErrorFragment);
};

type MutateResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

type Options = {
  expectedTypename: string;
  refetchQueries?: string[];
  update?: MutationUpdaterFn<SmartMutationResult>;
};

export const useSmartMutation = <V>(
  document: TypedDocumentNode<SmartMutationResult, V>,
  { refetchQueries, expectedTypename, update }: Options
) => {
  const [mutationCb] = useMutation(document, {
    refetchQueries,
    update,
    awaitRefetchQueries: true,
  });

  const cb = useCallback(
    async ({ variables }: { variables: V }): Promise<MutateResult> => {
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
          ok: false,
          error,
        };
      }

      if (!mutationResult) {
        return {
          ok: false,
          error: 'Неизвестная ошибка',
        };
      }
      const { data } = mutationResult;
      if (!data) {
        return {
          ok: false,
          error: 'Неизвестная ошибка',
        };
      }
      if (data.result.__typename === expectedTypename) {
        return { ok: true };
      }

      switch (data.result.__typename) {
        case 'ValidationError':
          return {
            ok: false,
            fieldErrors: Object.fromEntries(
              (data.result as ValidationErrorFragment).errors.map((error) => [
                error.name,
                error.messages.join('. '),
              ])
            ),
          };
        case 'GenericError':
          return {
            ok: false,
            error: (data.result as GenericErrorFragment).message,
          };
        default:
          return {
            ok: false,
            error: 'Неизвестная ошибка',
          };
      }
    },
    [mutationCb, expectedTypename]
  );

  return cb;
};
