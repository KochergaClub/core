import React, { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { CreateAuthGroupDocument } from '../queries.generated';

const shape: FormShape = [
  {
    name: 'name',
    type: 'string',
  },
];

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
    <ModalFormButton
      shape={shape}
      buttonName="Создать"
      modalButtonName="Создать группу"
      modalTitle="Создать группу"
      post={post}
    />
  );
};
