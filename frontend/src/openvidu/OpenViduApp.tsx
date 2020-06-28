import { Row } from '@kocherga/frontkit';
import { AsyncButton } from '~/components';

import { useOpenViduSession } from './hooks';
import OvVideo from './OvVideo';

interface Props {
  getToken: () => Promise<string>;
}

const OpenViduApp: React.FC<Props> = ({ getToken }) => {
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
