import { useCallback } from 'react';

import { MutationUpdaterFn } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

import { SmartMutationResult, useSmartMutation } from '~/common/hooks';
import { useNotification } from '~/frontkit';

import { ConfirmModal } from '../ConfirmModal';
import Action from './Action';
import ModalAction from './ModalAction';
import { CommonActionProps } from './types';

interface Props<V extends Record<string, unknown>> extends CommonActionProps {
  mutation: TypedDocumentNode<SmartMutationResult, V>;
  expectedTypename: string;
  variables: V;
  refetchQueries?: string[];
  updateCache?: MutationUpdaterFn<SmartMutationResult>;
  confirmText?: string;
}

export function SmartMutationAction<V extends Record<string, unknown>>({
  icon,
  title,
  mutation,
  expectedTypename,
  variables,
  confirmText,
  refetchQueries,
  updateCache,
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
      <ModalAction title={title} icon={icon}>
        {({ close }) => (
          <ConfirmModal close={close} act={act} submitButton={title}>
            {confirmText}
          </ConfirmModal>
        )}
      </ModalAction>
    );
  } else {
    return <Action act={act} title={title} icon={icon} />;
  }
}
