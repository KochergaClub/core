import React, { useCallback, useState } from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CustomCardListView, PagedApolloCollection } from '~/components/collections';
import { useFormModalSmartMutation } from '~/components/forms/hooks';
import { ShapeToValues } from '~/components/forms/types';

import { LeadCard } from './LeadCard';
import { FilterName, filterNameToInput, LeadListFilter } from './LeadListFilter';
import {
    CreateEvenmanLeadDocument, EvenmanLeadFragment, EvenmanLeadsDocument
} from './queries.generated';

const leadShape = [
  { name: 'name', title: 'Имя', type: 'string' },
  { name: 'description', title: 'Описание', type: 'markdown', optional: true },
] as const;

type CreateLeadValues = ShapeToValues<typeof leadShape>;

const renderItem = (lead: EvenmanLeadFragment) => <LeadCard lead={lead} />;

export const LeadScreen: React.FC = () => {
  const [filterName, setFilterName] = useState<FilterName>('active');

  const queryResults = useQuery(EvenmanLeadsDocument, {
    variables: { first: 20, filter: filterNameToInput[filterName] },
    nextFetchPolicy: 'cache-and-network',
  });

  const innerAdd = useFormModalSmartMutation(CreateEvenmanLeadDocument, {
    refetchQueries: ['EvenmanLeads'],
    expectedTypename: 'CommunityLead',
  });

  const add = useCallback(
    async (values: CreateLeadValues) => {
      return await innerAdd({
        variables: {
          input: values,
        },
      });
    },
    [innerAdd]
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
            controls={() => (
              <LeadListFilter filter={filterName} setFilter={setFilterName} />
            )}
            view={({ items }) => (
              <CustomCardListView
                items={items}
                renderItem={renderItem}
                item2key={(lead) => lead.id}
              />
            )}
          />
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};
