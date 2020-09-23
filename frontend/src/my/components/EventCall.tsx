import dynamic from 'next/dynamic';
import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { EventGenerateOpenViduTokenDocument } from '../queries.generated';

const OpenViduApp = dynamic(() => import('~/openvidu/OpenViduApp'), {
  ssr: false,
});

interface Props {
  event_id: string;
}

const EventCall: React.FC<Props> = ({ event_id }) => {
  const [generateTokenMutation] = useMutation(
    EventGenerateOpenViduTokenDocument
  );

  const getToken = useCallback(async () => {
    const { data } = await generateTokenMutation({
      variables: { event_id },
    });
    if (!data || !data.result) {
      throw Error('Failed to obtain token');
    }
    return data.result.token;
  }, [generateTokenMutation, event_id]);

  return <OpenViduApp getToken={getToken} />;
};

export default EventCall;
