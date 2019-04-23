import { useEffect, useCallback, useRef } from 'react';

// This function is useful for client side only.
// In most cases you should use GlobalContext.csrfToken or <CSRFInput /> instead.
export const getCSRFToken = () => {
  if (typeof document === 'undefined') {
    throw Error(
      "Server-side rendering doesn't allow CSRF tokens, use GlobalContext instead"
    );
  }
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};

declare global {
  interface Window {
    WebSocket: any;
  }
}

export const useListeningWebSocket = (
  path: string,
  onmessage: (e: any) => void
) => {
  // avoid re-creating websocket when onmessage updates
  const cbRef = useRef(onmessage);
  useEffect(
    () => {
      cbRef.current = onmessage;
    },
    [onmessage]
  );

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
        cbRef.current(e);
      };

      return () => socket.close();
    },
    [path]
  );
};

export const apiCall = async (
  path: string,
  method: string,
  payload?: object,
  expectJSON: boolean = true
) => {
  if (typeof window === 'undefined') {
    // API calls in SSR can't be done without react hooks / contexts safely.
    // This can be fixed by replacing apiCall with some kind of custom useAPI hook.
    throw Error("Server-side rendering doesn't support API calls yet");
  }

  const params: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken(),
    },
  };
  if (payload) {
    params.body = JSON.stringify(payload);
  }

  const response = await fetch(`/api/${path}`, params);

  if (!response.ok) {
    const responseBody = await response.text();
    window.alert(`Error: ${JSON.stringify(responseBody)}`);
    return;
  }

  if (expectJSON) {
    return await response.json();
  }
};

export const useFocusOnFirstModalRender = () => {
  const firstRender = useRef(true);

  return useCallback((el: HTMLElement | null) => {
    if (firstRender.current) {
      firstRender.current = false; // focus only once, just to avoid nasty errors
      if (el) {
        setTimeout(() => el.focus(), 50); // timers are necessary because we use Modal with portals
      }
    }
  }, []);
};
