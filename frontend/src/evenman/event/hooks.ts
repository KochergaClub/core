import {
  useEvenmanUpdateMutation,
  EvenmanUpdateMutationVariables,
} from './queries.generated';
import { useNotification } from '~/common/hooks';

export const useUpdateMutation = (event_id: string) => {
  const notify = useNotification();
  const [mutation] = useEvenmanUpdateMutation({
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
