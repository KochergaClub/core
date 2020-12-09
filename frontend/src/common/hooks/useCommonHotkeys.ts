import { useCallback } from 'react';

/*
 *  Pass the result from this hook to element's props to make it escapable or enterable.
 *  Example:
 *
 *    const hotkeys = useCommonHotkeys({ onEscape: ..., onEnter: ... });
 *    <div {...hotkeys}>Content</div>;
 */
const useCommonHotkeys = ({
  onEscape,
  onEnter,
}: {
  onEscape?: () => void;
  onEnter?: () => void;
}) => {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.keyCode === 27 && onEscape) {
        e.preventDefault();
        onEscape();
      }
      if (e.keyCode === 13 && onEnter) {
        e.preventDefault();
        onEnter();
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

export default useCommonHotkeys;
