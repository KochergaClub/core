import Link from 'next/link';
import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

import { useApolloClient } from '@apollo/client';

import { DropdownMenu, Markdown } from '~/components';
import { CardSection } from '~/components/cards';
import { ModalAction, MutationAction, SmartMutationAction } from '~/components/DropdownMenu';
import { SmartMutationModal } from '~/components/forms/SmartMutationModal';
import { A } from '~/frontkit';

import { CommentsList } from '../lead/CommentsList';
import { leadDetailsRoute } from '../routes';
import {
    AddLeadToCommunityInitiativeDocument, CommentOnCommunityInitiativeDocument,
    DeleteEvenmanInitiativeDocument, EvenmanInitiativeFragment, LeadForPickerFragment,
    RemoveLeadFromCommunityInitiativeDocument, SearchLeadsForPickerDocument
} from './queries.generated';

const AddLeadToCommunityInitiativeModal: React.FC<{
  initiative: EvenmanInitiativeFragment;
  close: () => void;
}> = ({ initiative, close }) => {
  const apolloClient = useApolloClient();
  return (
    <SmartMutationModal
      mutation={AddLeadToCommunityInitiativeDocument}
      expectedTypename="CommunityInitiative"
      title="Выберите лида"
      close={close}
      shape={[
        {
          type: 'fk',
          name: 'lead_id',
          widget: {
            type: 'async',
            display: (lead: LeadForPickerFragment) => lead.name,
            load: async (inputValue: string) => {
              const { data } = await apolloClient.query({
                query: SearchLeadsForPickerDocument,
                variables: { query: inputValue },
              });
              if (!data) {
                return []; // TODO - proper error handling
              }
              return data.communityLeads.edges.map((e) => e.node);
            },
            getValue: (c: LeadForPickerFragment) => c.id,
          },
        },
      ]}
      valuesToVariables={(v) => ({
        input: {
          initiative_id: initiative.id,
          lead_id: v.lead_id,
        },
      })}
    />
  );
};

type Props = {
  initiative: EvenmanInitiativeFragment;
};

export const InitiativeCard: React.FC<Props> = ({ initiative }) => {
  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <header className="font-bold mb-2">{initiative.title}</header>
        <DropdownMenu>
          <ModalAction title="Связать с лидом" icon={FaPlus}>
            {({ close }) => (
              <AddLeadToCommunityInitiativeModal
                close={close}
                initiative={initiative}
              />
            )}
          </ModalAction>
          <MutationAction
            title="Удалить"
            icon={FaTrash}
            mutation={DeleteEvenmanInitiativeDocument}
            variables={{ id: initiative.id }}
            refetchQueries={['EvenmanInitiatives']}
            confirmText={`Удалить ${initiative.title}?`}
          />
        </DropdownMenu>
      </div>
      {initiative.leads.length ? (
        <CardSection title="Лиды">
          {initiative.leads.map((lead) => (
            <div key={lead.id} className="flex space-x-1 items-center">
              <Link href={leadDetailsRoute(lead.id)} passHref>
                <A>{lead.name}</A>
              </Link>
              <DropdownMenu>
                <SmartMutationAction
                  title="Отвязать"
                  icon={FaTrash}
                  mutation={RemoveLeadFromCommunityInitiativeDocument}
                  expectedTypename="CommunityInitiative"
                  variables={{
                    input: { initiative_id: initiative.id, lead_id: lead.id },
                  }}
                />
              </DropdownMenu>
            </div>
          ))}
        </CardSection>
      ) : null}
      {initiative.description ? (
        <CardSection title="Описание">
          <Markdown source={initiative.description} />
        </CardSection>
      ) : null}
      <CardSection title="Комментарии">
        <CommentsList
          commentable={initiative}
          create={{
            typename: 'CommunityInitiative',
            mutation: CommentOnCommunityInitiativeDocument,
            valuesToVariables: (v) => ({
              input: {
                initiative_id: initiative.id,
                text: v.text,
              },
            }),
          }}
        />
      </CardSection>
    </div>
  );
};
