import React, { useCallback } from 'react';

import { TypedDocumentNode, useMutation } from '@apollo/client';

import { ConfirmModal } from '../ConfirmModal';
import { Action } from './Action';
import { ModalAction } from './ModalAction';
import { CommonActionProps } from './types';

interface Props<V extends Record<string, unknown>> extends CommonActionProps {
  mutation: TypedDocumentNode<unknown, V>;
  variables?: V;
  refetchQueries?: string[];
  confirmText?: string;
}

export function MutationAction<V extends Record<string, unknown>>({
  icon,
  title,
  mutation,
  variables,
  refetchQueries,
  confirmText,
}: Props<V>) {
  // copy-pasted from MutationButton, move to callback?
  // (but we need to figure out smarter error handling code first)
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
