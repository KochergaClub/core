import { useMutation } from '@apollo/client';

import { useNotification } from '~/frontkit';

import { EvenmanUpdateDocument, EvenmanUpdateMutationVariables } from './queries.generated';

export const useUpdateMutation = (event_id: string) => {
  const notify = useNotification();
  const [mutation] = useMutation(EvenmanUpdateDocument, {
    onError(error) {
      notify({
        text: error.message,
        type: 'Error',
      });
    },
  });

  return async (variables: Omit<EvenmanUpdateMutationVariables, 'id'>) => {
    const result = await mutation({
      variables: {
        id: event_id,
        ...variables,
      },
    });
    if (result && result.errors) {
      notify({
        text: JSON.stringify(result.errors),
        type: 'Error',
      });
    }
    return result;
  };
};
