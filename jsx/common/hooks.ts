import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { IS_SERVER } from './utils';

import GlobalContext from '../components/GlobalContext';

export const useListeningWebSocket = (
  path: string,
  onmessage: (e: any) => void
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
    socket.onmessage = async (e: any) => {
      cbRef.current(e);
    };

    return () => socket.close();
  }, [path]);
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

export const useAPI = () => {
  const { api } = useContext(GlobalContext);
  return api;
};

export const useExpandable = () => {
  const [expanded, setExpanded] = useState(false);

  const flipExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const unexpand = useCallback(() => {
    setExpanded(false);
  }, []);

  const ref = useRef(null);
  useOnClickOutside(ref, unexpand);

  return {
    expanded,
    flipExpand,
    unexpand,
    ref,
  };
};
