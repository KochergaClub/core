import React from 'react';

import { VariablesOf } from '@graphql-typed-document-node/core';

import { SmartMutationModal } from '~/components/forms/SmartMutationModal';

import { EvenmanLeadFragment, UpdateEvenmanLeadDocument } from './queries.generated';

const shape = [
  {
    name: 'name',
    type: 'string',
    title: 'Имя',
  },
  {
    name: 'description',
    type: 'richtext',
    title: 'Описание',
    optional: true,
  },
] as const;

interface Props {
  lead: EvenmanLeadFragment;
  close: () => void;
}

export const EditLeadModal: React.FC<Props> = ({ lead, close }) => {
  return (
    <SmartMutationModal
      mutation={UpdateEvenmanLeadDocument}
      expectedTypename="CommunityLead"
      valuesToVariables={(
        v
      ): VariablesOf<typeof UpdateEvenmanLeadDocument> => ({
        input: {
          id: lead.id,
          name: v.name,
          description: v.description,
        },
      })}
      shape={shape}
      defaultValues={{
        name: lead.name,
        description: lead.description,
      }}
      close={close}
      title="Редактирование лида!"
      submitLabel="Сохранить"
    />
  );
};
