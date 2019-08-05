import { useEffect, useRef } from 'react';

import { IS_SERVER } from '../utils';

const useListeningWebSocket = (
  path: string,
  onmessage: (e: MessageEvent) => void
) => {
  // avoid re-creating websocket when onmessage updates
  const cbRef = useRef(onmessage);
  useEffect(() => {
    cbRef.current = onmessage;
  }, [onmessage]);

  useEffect(() => {
    if (IS_SERVER || !window.WebSocket) {
      return;
    }
    const socketProtocol =
      window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new window.WebSocket(
      `${socketProtocol}//${window.location.host}/${path}`
    );
    socket.onmessage = async (e: MessageEvent) => {
      cbRef.current(e);
    };

    return () => socket.close();
  }, [path]);
};

export default useListeningWebSocket;
