import {
  useEvenmanUpdateMutation,
  EvenmanUpdateMutationVariables,
} from './queries.generated';

export const useUpdateMutation = (event_id: string) => {
  const [mutation] = useEvenmanUpdateMutation();

  return (variables: Omit<EvenmanUpdateMutationVariables, 'id'>) =>
    mutation({
      variables: {
        id: event_id,
        ...variables,
      },
    });
};
