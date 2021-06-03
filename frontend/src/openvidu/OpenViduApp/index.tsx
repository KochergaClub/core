import { useState } from 'react';

import { Column } from '~/frontkit';

import Controls from './Controls';
import { useOpenViduSession } from './hooks';
import JoinSettings from './JoinSettings';
import OvVideo from './OvVideo';

interface Props {
  getToken: () => Promise<string>;
}

const OpenViduApp: React.FC<Props> = ({ getToken }) => {
  const {
    session,
    subscribers,
    publisher,
    joinSession,
    leaveSession,
    ov,
  } = useOpenViduSession(getToken);

  const [fakeStreams, setFakeStreams] = useState<number>(0);

  if (!session || !publisher) {
    return <JoinSettings ov={ov} joinSession={joinSession} />;
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
            setFakeStreams((fakeStreams) => fakeStreams + 1);
          }}
          publisher={publisher}
          session={session}
          leaveSession={() => {
            setFakeStreams(0);
            leaveSession();
          }}
        />
      </Column>
      <div
        className="grid w-full gap-1 p-2 grid-flow-row place-items-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        }}
      >
        {allSubscribers.map((subscriber) => (
          <OvVideo
            key={subscriber.stream.streamId}
            streamManager={subscriber}
          />
        ))}
      </div>
      {subscribers.length ? null : (
        <Column centered>
          <h1>Других участников пока нет :(</h1>
        </Column>
      )}
    </div>
  );
};

export default OpenViduApp;
