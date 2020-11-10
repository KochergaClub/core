import { useCallback } from 'react';

import { useMutation } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

import { AsyncButton } from '~/frontkit';

import AsyncButtonWithConfirm from './AsyncButtonWithConfirm';

interface Props<V extends Record<string, unknown>> {
  mutation: TypedDocumentNode<unknown, V>;
  variables?: V;
  size?: Parameters<typeof AsyncButton>[0]['size'];
  kind?: Parameters<typeof AsyncButton>[0]['kind'];
  confirmText?: string;
  refetchQueries?: string[];
  children: React.ReactNode;
}

function MutationButton<V extends Record<string, unknown>>({
  mutation,
  variables,
  size,
  kind,
  confirmText,
  refetchQueries,
  children,
}: Props<V>) {
  const [mutationCb] = useMutation(mutation, {
    refetchQueries,
    awaitRefetchQueries: true,
  });
  const act = useCallback(async () => {
    await mutationCb({
      variables,
    });
  }, [mutationCb, variables]);

  if (confirmText) {
    return (
      <AsyncButtonWithConfirm
        act={act}
        size={size}
        kind={kind}
        confirmText={confirmText}
      >
        {children}
      </AsyncButtonWithConfirm>
    );
  } else {
    return (
      <AsyncButton act={act} size={size} kind={kind}>
        {children}
      </AsyncButton>
    );
  }
}

export default MutationButton;
