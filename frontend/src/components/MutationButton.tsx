import { useCallback } from 'react';

import { useMutation } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

import AsyncButton from './AsyncButton';
import AsyncButtonWithConfirm from './AsyncButtonWithConfirm';

interface Props<V extends Record<string, unknown>> {
  mutation: TypedDocumentNode<unknown, V>;
  variables: V;
  size?: Parameters<typeof AsyncButton>[0]['size'];
  kind?: Parameters<typeof AsyncButton>[0]['kind'];
  confirmText?: string;
  children: React.ReactNode;
}

function MutationButton<V extends Record<string, unknown>>({
  mutation,
  variables,
  size,
  kind,
  confirmText,
  children,
}: Props<V>) {
  const [mutationCb] = useMutation(mutation);
  const act = useCallback(async () => {
    await mutationCb({
      variables,
    });
  }, [mutationCb, variables]);

  if (confirmText) {
    return (
      <AsyncButtonWithConfirm
        act={act}
        small={size === 'small'}
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
