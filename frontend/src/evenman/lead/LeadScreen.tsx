import React, { useCallback } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CustomCardListView, PagedApolloCollection } from '~/components/collections';
import { AnyViewProps } from '~/components/collections/types';
import { FormShape } from '~/components/forms/types';

import { LeadCard } from './LeadCard';
import {
    CreateEvenmanLeadDocument, EvenmanLeadFragment, EvenmanLeadsDocument
} from './queries.generated';

const leadShape: FormShape = [
  { name: 'name', title: 'Имя', type: 'string' },
  { name: 'description', title: 'Описание', type: 'richtext', optional: true },
];

type CreateLeadValues = {
  name: string;
  description: string;
};

const renderItem = (lead: EvenmanLeadFragment) => <LeadCard lead={lead} />;

const View: React.FC<AnyViewProps<EvenmanLeadFragment>> = (props) => (
  <CustomCardListView
    {...props}
    renderItem={renderItem}
    item2key={(lead) => lead.id}
  />
);

export const LeadScreen: React.FC = () => {
  const queryResults = useQuery(EvenmanLeadsDocument, {
    variables: { first: 20 },
  });

  const [addMutation] = useMutation(CreateEvenmanLeadDocument, {
    refetchQueries: ['EvenmanLeads'],
    awaitRefetchQueries: true,
  });

  const add = useCallback(
    async (values: CreateLeadValues) => {
      await addMutation({
        variables: {
          input: values,
        },
      });
    },
    [addMutation]
  );

  return (
    <PaddedBlock>
      <ApolloQueryResults {...queryResults} size="block">
        {({ data: { communityLeads } }) => (
          <PagedApolloCollection
            connection={communityLeads}
            fetchPage={queryResults.refetch}
            names={{ plural: 'лиды', genitive: 'лида' }}
            add={{
              cb: add,
              shape: leadShape,
            }}
            view={View}
          />
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};
