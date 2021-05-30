import { motion } from 'framer-motion';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';

// Styling tips: https://css-tricks.com/considerations-styling-modal/

const Overlay: React.FC = () => (
  <motion.div
    className="absolute inset-0 -z-10 bg-black"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.3 }}
  />
);

const ModalHeader: React.FC<{ close: () => void }> = ({ children, close }) => {
  return (
    <header className="px-5 py-3 border-0 border-b border-solid border-gray-200 font-bold flex items-center justify-between">
      <div>{children}</div>
      <button
        className="px-1 border-0 bg-transparent cursor-pointer text-gray-700 hover:text-accent-500"
        type="button"
        onClick={close}
      >
        <MdClose />
      </button>
    </header>
  );
};

// TODO - get rid of forwardRef, support `focus` and `{...hotkeys}` via smart props
const ModalBody = React.forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements['div']
>(function ModalBody(props, ref) {
  return <div ref={ref} className="px-5 py-3 overflow-auto" {...props} />;
});

const ModalFooter: React.FC = ({ children }) => (
  <div className="px-5 py-3 border-0 border-t border-solid border-gray-200">
    {children}
  </div>
);

const ModalWindow: React.FC = ({ children }) => (
  <div className="bg-white rounded shadow-2xl max-h-full overflow-auto flex flex-col mx-2 min-w-xs sm:min-w-lg">
    {children}
  </div>
);

type ModalType = React.FC & {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Header: typeof ModalHeader;
  _Content: typeof ModalWindow;
  _Overlay: typeof Overlay;
};

export const Modal: ModalType = ({ children }) => {
  const [el] = React.useState(() => document.createElement('div'));

  React.useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  const modal = (
    <div className="fixed inset-0 z-40 flex justify-center items-center">
      <Overlay />
      <ModalWindow>{children}</ModalWindow>
    </div>
  );

  return ReactDOM.createPortal(modal, el);
};

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;

// for storybook testing etc.
Modal._Content = ModalWindow;
Modal._Overlay = Overlay;
