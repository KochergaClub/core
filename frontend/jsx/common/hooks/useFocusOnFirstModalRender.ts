import { useCallback, useRef } from 'react';

/*
 *  Use this hook's result as ref to focus on input in a modal.
 *  Example:
 *
 *    const focus = useFocusOnFirstModalRender();
 *    <Modal>
 *      <input ref={focus} ... />
 *    </Modal>
 */
const useFocusOnFirstModalRender = () => {
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

export default useFocusOnFirstModalRender;
