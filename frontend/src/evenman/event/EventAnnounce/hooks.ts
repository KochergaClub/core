import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { EventAnnounceTarget } from '~/apollo/types.generated';

import { EvenmanSetAnnounceUrlDocument } from '../queries.generated';

export const useSetAnnounceUrl = (
  event_id: string,
  target: EventAnnounceTarget
) => {
  const [setAnnounceUrl] = useMutation(EvenmanSetAnnounceUrlDocument);

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
