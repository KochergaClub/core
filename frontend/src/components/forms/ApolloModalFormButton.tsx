import { useCallback } from 'react';

import { GraphQLError } from 'graphql';
import { ExecutionResult } from '@apollo/react-common';

import { FormShape } from './types';
import ModalFormButton from './ModalFormButton';

interface Props<FormResult extends {}> {
  fields: FormShape; // FormShape should match mutation params!
  buttonName: string;
  modalButtonName: string;
  modalTitle: string;
  small?: boolean;
  mutation: (options: {
    variables: { params: FormResult };
  }) => Promise<ExecutionResult<any>>;
}

export default function ApolloModalFormButton<FormResult>({
  mutation,
  ...otherProps
}: Props<FormResult>) {
  const cb = useCallback(
    async (values: FormResult) => {
      try {
        await mutation({
          variables: {
            params: values,
          },
        });
        return;
      } catch (e) {
        const errors = e.graphQLErrors as GraphQLError[];

        const error = errors.length
          ? errors
              .map(
                e =>
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