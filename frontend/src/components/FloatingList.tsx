import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef } from 'react';

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        ref={ref}
        className={clsx(
          'rounded shadow-floating select-none z-10 relative bg-white cursor-pointer',
          'overflow-hidden' // necessary to avoid broken corners when items are hovered
        )}
        style={style}
        {...attributes}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default forwardRef(FloatingList);
