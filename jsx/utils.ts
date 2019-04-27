import { useEffect, useCallback, useRef } from 'react';

const IS_SERVER = typeof window === 'undefined';

const fetch = IS_SERVER ? require('node-fetch').default : window.fetch;

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
      if (IS_SERVER || !window.WebSocket) {
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

export class API {
  csrfToken: string;
  base: string = '';

  constructor(csrfToken: string, base: string = '') {
    this.csrfToken = csrfToken;
    this.base = base;
  }

  call = async (
    path: string,
    method: string,
    payload?: object,
    expectJSON: boolean = true
  ) => {
    const params: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': this.csrfToken,
      },
    };
    if (payload) {
      params.body = JSON.stringify(payload);
    }

    const response = await fetch(`${this.base}/api/${path}`, params);

    if (!response.ok) {
      const responseBody = await response.text();
      window.alert(`Error: ${JSON.stringify(responseBody)}`);
      return;
    }

    if (expectJSON) {
      return await response.json();
    }
  };
}

export const apiCall = async (
  path: string,
  method: string,
  payload?: object,
  expectJSON: boolean = true
) => {
  if (typeof window === 'undefined') {
    // API calls in SSR can't be done without react hooks / contexts safely, since they require csrfToken.
    // This can be fixed by replacing apiCall with some global API object which is stored in React context.
    throw Error("Server-side rendering doesn't support API calls yet");
  }

  const api = new API(getCSRFToken());
  return await api.call(path, method, payload, expectJSON);
};

/*
 *  Use this hook's result as ref to focus on input in a modal.
 *  Example:
 *
 *    const focus = useFocusOnFirstModalRender();
 *    <Modal>
 *      <input ref={focus} ... />
 *    </Modal>
 */
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

/*
*  Pass the result from this hook to element's props to make it escapable or enterable.
*  Example:
*
*    const hotkeys = useCommonHotkeys({ onEscape: ..., onEnter: ... });
*    <div {...hotkeys}>Content</div>;
*/
export const useCommonHotkeys = ({
  onEscape,
  onEnter,
}: {
  onEscape?: () => void;
  onEnter?: () => void;
}) => {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.keyCode === 27) {
        onEscape && onEscape();
      }
      if (e.keyCode === 13) {
        onEnter && onEnter();
      }
    },
    [onEscape, onEnter]
  );

  return {
    onKeyDown,
    tabIndex: -1,
    style: { outline: 'none' },
  };
};
