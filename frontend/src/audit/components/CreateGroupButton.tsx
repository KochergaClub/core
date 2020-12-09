import React, { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { FormShapeModalButton } from '~/components/forms';

import { CreateAuthGroupDocument } from '../queries.generated';

const shape = [
  {
    name: 'name',
    type: 'string',
  },
] as const;

export const CreateGroupButton: React.FC = () => {
  const [createMutation] = useMutation(CreateAuthGroupDocument, {
    refetchQueries: ['AuthGroups'],
    awaitRefetchQueries: true,
  });

  const post = useCallback(
    async (v: { name: string }) => {
      await createMutation({
        variables: {
          name: v.name,
        },
      });
    },
    [createMutation]
  );

  return (
    <FormShapeModalButton
      shape={shape}
      buttonLabel="Создать"
      modalSubmitLabel="Создать группу"
      modalTitle="Создать группу"
      post={post}
    />
  );
};
