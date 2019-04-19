import { useEffect } from 'react';

export const getCSRFToken = () => {
  if (typeof document === 'undefined') {
    return ''; // server-side rendering doesn't support CSRF tokens (yet)
  }
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};

export const useListeningWebSocket = (
  path: string,
  onmessage: (e: any) => void
) => {
  useEffect(
    () => {
      if (typeof window === 'undefined' || !window.WebSocket) {
        return;
      }
      const socketProtocol =
        window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const socket = new window.WebSocket(
        `${socketProtocol}//${window.location.host}/${path}`
      );
      socket.onmessage = async (e: any) => {
        onmessage(e);
      };

      return () => socket.close();
    },
    [path, onmessage]
  );
};
