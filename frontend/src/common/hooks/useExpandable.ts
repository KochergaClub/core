import { useState, useCallback, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

const useExpandable = () => {
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

export default useExpandable;
