import React from 'react';

import { VariablesOf } from '@graphql-typed-document-node/core';

import { CommunityLeadStatus } from '~/apollo/types.generated';
import { SmartMutationModal } from '~/components/forms/SmartMutationModal';

import { EvenmanLeadFragment, UpdateEvenmanLeadDocument } from './queries.generated';
import { statusNames } from './utils';

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
  {
    name: 'status',
    type: 'choice',
    title: 'Статус',
    widget: 'radio',
    options: Object.values(CommunityLeadStatus).map(
      (value) => [value, statusNames[value] || value] as [string, string]
    ),
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
          status: v.status,
        },
      })}
      shape={shape}
      defaultValues={{
        name: lead.name,
        description: lead.description,
        status: lead.status,
      }}
      close={close}
      title="Редактирование лида"
      submitLabel="Сохранить"
    />
  );
};
