import { useMutation, useQuery } from '@apollo/client';

import { EventUpdateInput } from '~/apollo/types.generated';
import { useNotification } from '~/frontkit';

import { EvenmanGlobalSettingsDocument, EvenmanUpdateDocument } from './queries.generated';

interface UpdateParams {
  refetchQueries?: string[];
}

export const useUpdateMutation = (
  event_id: string,
  params: UpdateParams = {}
) => {
  const notify = useNotification();
  const [mutation] = useMutation(EvenmanUpdateDocument, {
    refetchQueries: params.refetchQueries,
    awaitRefetchQueries: true,
    onError(error) {
      notify({
        text: error.message,
        type: 'Error',
      });
    },
  });

  return async (variables: Omit<EventUpdateInput, 'event_id'>) => {
    const result = await mutation({
      variables: {
        input: {
          event_id,
          ...variables,
        },
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

export const useEvenmanSettingsQuery = () =>
  useQuery(EvenmanGlobalSettingsDocument, {
    fetchPolicy: 'cache-first',
  });
