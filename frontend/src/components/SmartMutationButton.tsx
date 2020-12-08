import { useCallback } from 'react';

import { MutationUpdaterFn } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

import { SmartMutationResult, useSmartMutation } from '~/common/hooks';
import { AsyncButton, useNotification } from '~/frontkit';

import AsyncButtonWithConfirm from './AsyncButtonWithConfirm';

interface Props<V extends Record<string, unknown>> {
  mutation: TypedDocumentNode<SmartMutationResult, V>;
  expectedTypename: string;
  variables: V;
  size?: Parameters<typeof AsyncButton>[0]['size'];
  kind?: Parameters<typeof AsyncButton>[0]['kind'];
  confirmText?: string;
  refetchQueries?: string[];
  updateCache?: MutationUpdaterFn<SmartMutationResult>;
  children: React.ReactNode;
}

export function SmartMutationButton<V extends Record<string, unknown>>({
  mutation,
  expectedTypename,
  variables,
  size,
  kind,
  confirmText,
  refetchQueries,
  updateCache,
  children,
}: Props<V>) {
  const notify = useNotification();
  const mutate = useSmartMutation(mutation, {
    expectedTypename,
    refetchQueries,
    update: updateCache,
  });
  const act = useCallback(async () => {
    const result = await mutate({
      variables,
    });
    if (!result.ok) {
      notify({
        type: 'Error',
        text: result.error || 'Неизвестная ошибка',
      });
    }
  }, [mutate, variables, notify]);

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
