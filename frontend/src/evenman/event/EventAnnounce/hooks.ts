import { useCallback } from 'react';
import { EventAnnounceTarget } from '~/apollo/types.generated';

import { useEvenmanSetAnnounceUrlMutation } from '../queries.generated';

export const useSetAnnounceUrl = (
  event_id: string,
  target: EventAnnounceTarget
) => {
  const [setAnnounceUrl] = useEvenmanSetAnnounceUrlMutation();

  return useCallback(
    (value: string) =>
      setAnnounceUrl({
        variables: {
          event_id,
          target,
          url: value,
        },
      }),
    [setAnnounceUrl, event_id, target]
  );
};
