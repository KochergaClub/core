import React, { useCallback, useState } from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CustomCardListView } from '~/components/collections';
import { CollectionHeader } from '~/components/collections/CollectionHeader';
import HeadlessConnection from '~/components/collections/HeadlessConnection';
import Pager from '~/components/collections/Pager';
import { useFormModalSmartMutation } from '~/components/forms/hooks';
import { ShapeToValues } from '~/components/forms/types';
import { Column, Input, Row } from '~/frontkit';

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
  const [searchQuery, setSearchQuery] = useState('');

  const queryResults = useQuery(EvenmanLeadsDocument, {
    variables: {
      first: 20,
      filter: {
        ...filterNameToInput[filterName],
        search: searchQuery,
      },
    },
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
      <CollectionHeader
        title="Лиды"
        add={{
          cb: add,
          shape: leadShape,
          title: 'Создать лида',
        }}
        refetch={queryResults.refetch}
      />
      <Column gutter={8} stretch>
        <Row spaced>
          <LeadListFilter filter={filterName} setFilter={setFilterName} />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              e.preventDefault();
              setSearchQuery(e.currentTarget.value);
            }}
          />
        </Row>
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { communityLeads } }) => (
            <HeadlessConnection
              connection={communityLeads}
              fetchPage={queryResults.refetch}
            >
              {({ items, next, previous }) => (
                <div>
                  <CustomCardListView
                    items={items}
                    renderItem={renderItem}
                    item2key={(lead) => lead.id}
                  />
                  <Pager
                    pageInfo={communityLeads.pageInfo}
                    next={next}
                    previous={previous}
                  />
                </div>
              )}
            </HeadlessConnection>
          )}
        </ApolloQueryResults>
      </Column>
    </PaddedBlock>
  );
};
