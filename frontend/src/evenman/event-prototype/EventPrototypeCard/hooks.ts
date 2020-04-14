import { MutationUpdaterFn } from 'apollo-client';

import {
  EvenmanPrototypeDocument,
  EvenmanPrototypeQuery,
  EventsPrototypeFragment,
  EvenmanPrototypeUpdateMutationVariables,
  useEvenmanPrototypeUpdateMutation,
} from '../queries.generated';

export const getCacheUpdater = <
  T extends { result: { prototype: EventsPrototypeFragment } }
>(
  prototype_id: string
) => {
  const updater: MutationUpdaterFn<T> = (cache, { data }) => {
    if (!data) {
      return;
    }
    const updatedPrototype = data.result.prototype;

    const cached = cache.readQuery<EvenmanPrototypeQuery>({
      query: EvenmanPrototypeDocument,
      variables: {
        id: prototype_id,
      },
    });
    if (!cached) {
      return; // shouldn't happen
    }
    cache.writeQuery({
      query: EvenmanPrototypeDocument,
      variables: {
        id: prototype_id,
      },
      data: {
        prototype: {
          ...cached.prototype,
          ...updatedPrototype,
        },
      },
    });
  };
  return updater;
};

// Wraps up graphql mutation with simpler interface and automates cache updates.
export const useUpdateMutation = (prototype_id: string) => {
  const [mutation] = useEvenmanPrototypeUpdateMutation({
    update: getCacheUpdater(prototype_id),
  });

  return (variables: Omit<EvenmanPrototypeUpdateMutationVariables, 'id'>) =>
    mutation({
      variables: {
        id: prototype_id,
        ...variables,
      },
    });
};
