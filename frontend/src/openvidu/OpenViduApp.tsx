import { useCallback } from 'react';
import { Row } from '@kocherga/frontkit';
import { AsyncButton } from '~/components';

import { useOpenViduSession } from './hooks';
import { useGenerateOpenViduTokenMutation } from './queries.generated';
import OvVideo from './OvVideo';

interface Props {
  event_id: string;
}

const OpenViduApp: React.FC<Props> = ({ event_id }) => {
  const [mutation] = useGenerateOpenViduTokenMutation();

  const getToken = useCallback(async () => {
    const { data } = await mutation({
      variables: { event_id },
    });
    if (!data || !data.result) {
      throw Error('Failed to obtain token');
    }
    return data.result.token;
  }, [mutation, event_id]);

  const { session, subscribers, publisher, joinSession } = useOpenViduSession(
    getToken
  );

  if (!session || !publisher) {
    return (
      <Row centered>
        <AsyncButton act={joinSession} kind="primary">
          Войти
        </AsyncButton>
      </Row>
    );
  }

  return (
    <Row centered>
      {subscribers.length ? (
        subscribers.map(subscriber => (
          <OvVideo
            key={subscriber.stream.streamId}
            streamManager={subscriber}
          />
        ))
      ) : (
        <h1>Других участников пока нет :(</h1>
      )}
    </Row>
  );
};

export default OpenViduApp;
