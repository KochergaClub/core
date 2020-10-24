import { useState } from 'react';
import { Publisher, Session } from 'openvidu-browser';
import { Row, Button } from '~/frontkit';

import MuteAudioButton from './MuteAudioButton';
import MuteVideoButton from './MuteVideoButton';

function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

interface Props {
  addFake: () => void;
  publisher: Publisher;
  session: Session;
  leaveSession: () => void;
}

const Controls: React.FC<Props> = ({ addFake, publisher, leaveSession }) => {
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
      <MuteAudioButton flip={flipAudio} active={publisher.stream.audioActive} />
      <MuteVideoButton flip={flipVideo} active={publisher.stream.videoActive} />
      <Button onClick={leaveSession}>Выйти</Button>
    </Row>
  );
};

export default Controls;
