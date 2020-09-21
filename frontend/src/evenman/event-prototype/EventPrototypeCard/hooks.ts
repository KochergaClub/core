import { useMutation } from '@apollo/client';

import {
    EvenmanPrototypeUpdateDocument, EvenmanPrototypeUpdateMutationVariables
} from '../queries.generated';

// Wraps up graphql mutation with simpler interface
export const useUpdateMutation = (prototype_id: string) => {
  const [mutation] = useMutation(EvenmanPrototypeUpdateDocument);

  return (variables: Omit<EvenmanPrototypeUpdateMutationVariables, 'id'>) =>
    mutation({
      variables: {
        id: prototype_id,
        ...variables,
      },
    });
};
