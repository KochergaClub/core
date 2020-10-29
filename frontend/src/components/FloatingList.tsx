import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const FloatingListDiv = styled(motion.div)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  user-select: none;
  border-radius: 4px;

  z-index: 10;
  position: relative;
  overflow: hidden; // necessary to avoid broken corners when items are hovered
  background-color: white;
  cursor: pointer;
`;

interface Props {
  expanded: boolean;
  style: React.CSSProperties; // usually used for popper
  attributes: { [key: string]: string }; // for popper
  ref: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}

const FloatingList: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.PropsWithChildren<Props>
> = ({ children, expanded, style, attributes }, ref) => (
  <AnimatePresence>
    {expanded && (
      <FloatingListDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        ref={ref}
        style={style}
        {...attributes}
      >
        {children}
      </FloatingListDiv>
    )}
  </AnimatePresence>
);

export default forwardRef(FloatingList);
