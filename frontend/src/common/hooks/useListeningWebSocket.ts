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

  const closingRef = useRef(false);

  useEffect(() => {
    if (IS_SERVER || !window.WebSocket) {
      return;
    }

    const socketProtocol =
      window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = `${socketProtocol}//${window.location.host}/${path}`;

    let socket: WebSocket | undefined;
    const RECONNECT_DELAY = 500;

    const initSocket = () => {
      socket = new window.WebSocket(url);

      socket.onmessage = async (e: MessageEvent) => {
        cbRef.current(e);
      };
      socket.onclose = () => {
        setTimeout(() => {
          if (closingRef.current) {
            return;
          }
          initSocket();
        }, RECONNECT_DELAY);
      };
    };

    initSocket();

    return () => {
      if (!socket) {
        return;
      }
      closingRef.current = true;
      socket.close();
    };
  }, [path]);
};

export default useListeningWebSocket;
