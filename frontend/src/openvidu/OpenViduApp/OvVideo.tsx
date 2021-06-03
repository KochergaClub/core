import { StreamManager } from 'openvidu-browser';
import { useEffect, useRef, useState } from 'react';

interface Props {
  streamManager: StreamManager;
}

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
    <div className="relative">
      <div className="absolute top-0 left-0 z-10 bg-white px-1 text-sm">
        {name}
      </div>
      <video
        className="w-full bg-black"
        autoPlay={true}
        ref={videoRef}
        muted={!streamManager.remote}
      />
    </div>
  );
};

export default OvVideo;
