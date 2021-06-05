import React, { useCallback, useState } from 'react';

import { useQuery } from '@apollo/client';

import { CommunityInitiativesFilterInput } from '~/apollo/types.generated';
import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CustomCardListView } from '~/components/collections';
import { CollectionHeader } from '~/components/collections/CollectionHeader';
import HeadlessConnection from '~/components/collections/HeadlessConnection';
import Pager from '~/components/collections/Pager';
import { useFormModalSmartMutation } from '~/components/forms/hooks';
import { ShapeToValues } from '~/components/forms/types';

import { InitiativeCard } from './InitiativeCard';
import { InitiativesFilterToolbar } from './InitiativesFilterToolbar';
import {
    CreateEvenmanInitiativeDocument, EvenmanInitiativeFragment, EvenmanInitiativesDocument
} from './queries.generated';

const shape = [
  { name: 'title', title: 'Название', type: 'string' },
  { name: 'description', title: 'Описание', type: 'markdown', optional: true },
] as const;

type CreateValues = ShapeToValues<typeof shape>;

const renderItem = (initiative: EvenmanInitiativeFragment) => (
  <InitiativeCard initiative={initiative} />
);

export const InitiativeScreen: React.FC = () => {
  const [filter, setFilter] = useState<CommunityInitiativesFilterInput>({
    status: null,
  });

  const queryResults = useQuery(EvenmanInitiativesDocument, {
    variables: {
      first: 20,
      filter,
    },
    nextFetchPolicy: 'cache-and-network',
  });

  const innerAdd = useFormModalSmartMutation(CreateEvenmanInitiativeDocument, {
    refetchQueries: ['EvenmanInitiatives'],
    expectedTypename: 'CommunityInitiative',
  });

  const add = useCallback(
    async (values: CreateValues) => {
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
      <div className="space-y-4">
        <CollectionHeader
          title="Инициативы"
          add={{
            cb: add,
            shape,
            title: 'Создать инициативу',
          }}
          refetch={queryResults.refetch}
        />
        <InitiativesFilterToolbar filter={filter} onChange={setFilter} />
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { communityInitiatives } }) => (
            <HeadlessConnection
              connection={communityInitiatives}
              fetchPage={queryResults.refetch}
            >
              {({ items, next, previous }) => (
                <div>
                  <CustomCardListView
                    items={items}
                    renderItem={renderItem}
                    item2key={(item) => item.id}
                  />
                  <Pager
                    pageInfo={communityInitiatives.pageInfo}
                    next={next}
                    previous={previous}
                  />
                </div>
              )}
            </HeadlessConnection>
          )}
        </ApolloQueryResults>
      </div>
    </PaddedBlock>
  );
};
