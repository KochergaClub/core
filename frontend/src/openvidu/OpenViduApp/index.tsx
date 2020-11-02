import { useState } from 'react';
import styled from 'styled-components';
import { Column } from '~/frontkit';

import { useOpenViduSession } from './hooks';
import OvVideo from './OvVideo';
import Controls from './Controls';
import JoinSettings from './JoinSettings';

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
