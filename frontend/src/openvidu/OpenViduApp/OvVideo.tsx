import { StreamManager } from 'openvidu-browser';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { fonts } from '~/frontkit';

interface Props {
  streamManager: StreamManager;
}

const Video = styled.video`
  width: 100%;
  background-color: black;
`;

const Container = styled.div`
  position: relative;
`;

const Name = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: white;
  padding: 0 4px;
  font-size: ${fonts.sizes.SM};
`;

const OvVideo: React.FC<Props> = ({ streamManager }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    const data = JSON.parse(streamManager.stream.connection.data);
    streamManager.addVideoElement(videoRef.current);
    setName(data.name);
  }, [streamManager]);

  return (
    <Container>
      <Name>{name}</Name>
      <Video autoPlay={true} ref={videoRef} muted={!streamManager.remote} />
    </Container>
  );
};

export default OvVideo;
