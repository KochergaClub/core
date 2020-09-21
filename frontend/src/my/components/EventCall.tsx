import dynamic from 'next/dynamic';
import { useCallback } from 'react';

import { useMutation } from '@apollo/client';
import { Row } from '@kocherga/frontkit';

import { EventGenerateOpenViduTokenDocument } from '../queries.generated';

const OpenViduApp = dynamic(() => import('~/openvidu/OpenViduApp'), {
  ssr: false,
});

interface Props {
  event_id: string;
}

const EventCall: React.FC<Props> = ({ event_id }) => {
  const [generateTokenMutation] = useMutation(EventGenerateOpenViduTokenDocument);

  const getToken = useCallback(async () => {
    const { data } = await generateTokenMutation({
      variables: { event_id },
    });
    if (!data || !data.result) {
      throw Error('Failed to obtain token');
    }
    return data.result.token;
  }, [generateTokenMutation, event_id]);

  return (
    <Row centered>Функционал созвонов через сайт находится в разработке.</Row>
  );

  // return <OpenViduApp getToken={getToken} />;
};

export default EventCall;
