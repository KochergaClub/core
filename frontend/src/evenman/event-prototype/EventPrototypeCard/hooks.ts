import {
  EvenmanPrototypeUpdateMutationVariables,
  useEvenmanPrototypeUpdateMutation,
} from '../queries.generated';

// Wraps up graphql mutation with simpler interface
export const useUpdateMutation = (prototype_id: string) => {
  const [mutation] = useEvenmanPrototypeUpdateMutation();

  return (variables: Omit<EvenmanPrototypeUpdateMutationVariables, 'id'>) =>
    mutation({
      variables: {
        id: prototype_id,
        ...variables,
      },
    });
};
