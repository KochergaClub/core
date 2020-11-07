import { GraphQLError } from 'graphql';
import { useCallback } from 'react';

import { FetchResult } from '@apollo/client';

import ModalFormButton from './ModalFormButton';
import { AnyFormValues, FormShape } from './types';

interface Props<FormResult extends AnyFormValues> {
  shape: FormShape; // FormShape should match mutation params!
  buttonName: string;
  modalButtonName: string;
  modalTitle: string;
  small?: boolean;
  mutation: (options: {
    variables: { input: FormResult };
  }) => Promise<FetchResult<unknown>>;
}

export default function ApolloModalFormButton<
  FormResult extends AnyFormValues
>({ mutation, ...otherProps }: Props<FormResult>) {
  const cb = useCallback(
    async (values: FormResult) => {
      try {
        await mutation({
          variables: {
            input: values,
          },
        });
        return;
      } catch (e) {
        const errors = e.graphQLErrors as GraphQLError[];

        const error = errors.length
          ? errors
              .map(
                (e) =>
                  e.message +
                  ': ' +
                  JSON.stringify(
                    e.extensions?.response?.body || 'unknown reason'
                  )
              )
              .join('. ')
          : String(e);

        return {
          close: false,
          error,
        };
      }
    },
    [mutation]
  );

  return <ModalFormButton post={cb} {...otherProps} />;
}
