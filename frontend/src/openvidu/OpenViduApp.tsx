import { useState } from 'react';
import styled from 'styled-components';
import { Publisher, Session } from 'openvidu-browser';
import { MdVideocam, MdVideocamOff, MdMic, MdMicOff } from 'react-icons/md';
import { Row, Column, Button } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import { useOpenViduSession } from './hooks';
import OvVideo from './OvVideo';

interface Props {
  getToken: () => Promise<string>;
}

const Grid = styled.div`
  width: 100%;
  display: grid;
  gap: 8px;
  padding: 8px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-flow: row;
  place-items: center;
`;

function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

interface ControlsProps {
  addFake: () => void;
  publisher: Publisher;
  session: Session;
  leaveSession: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  addFake,
  publisher,
  leaveSession,
}) => {
  const forceUpdate = useForceUpdate();

  const flipAudio = () => {
    publisher.publishAudio(!publisher.stream.audioActive);
    forceUpdate();
  };
  const flipVideo = () => {
    publisher.publishVideo(!publisher.stream.videoActive);
    forceUpdate();
  };
  return (
    <Row>
      {process.env.NODE_ENV === 'development' ? (
        <Button onClick={addFake}>Добавить фейкового участника</Button>
      ) : null}
      <Button onClick={flipAudio}>
        <Row vCentered>
          {publisher.stream.audioActive ? (
            <MdMic color="green" />
          ) : (
            <MdMicOff color="red" />
          )}
          <span>Микрофон</span>
        </Row>
      </Button>
      <Button onClick={flipVideo}>
        <Row vCentered>
          {publisher.stream.videoActive ? (
            <MdVideocam color="green" />
          ) : (
            <MdVideocamOff color="red" />
          )}
          <span>Видео</span>
        </Row>
      </Button>
      <Button onClick={leaveSession}>Выйти</Button>
    </Row>
  );
};

const OpenViduApp: React.FC<Props> = ({ getToken }) => {
  const {
    session,
    subscribers,
    publisher,
    joinSession,
    leaveSession,
  } = useOpenViduSession(getToken);

  const [fakeStreams, setFakeStreams] = useState<number>(0);

  if (!session || !publisher) {
    return (
      <Row centered>
        <AsyncButton act={joinSession} kind="primary">
          Войти
        </AsyncButton>
      </Row>
    );
  }

  const allSubscribers = [
    publisher,
    ...subscribers,
    ...Array(fakeStreams).fill(publisher),
  ];

  return (
    <div>
      <Column centered>
        <Controls
          addFake={() => {
            setFakeStreams(fakeStreams => fakeStreams + 1);
          }}
          publisher={publisher}
          session={session}
          leaveSession={() => {
            setFakeStreams(0);
            leaveSession();
          }}
        />
      </Column>
      <Grid>
        {allSubscribers.map(subscriber => (
          <OvVideo
            key={subscriber.stream.streamId}
            streamManager={subscriber}
          />
        ))}
      </Grid>
      {subscribers.length ? null : (
        <Column centered>
          <h1>Других участников пока нет :(</h1>
        </Column>
      )}
    </div>
  );
};

export default OpenViduApp;
