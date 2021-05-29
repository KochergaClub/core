import { motion } from 'framer-motion';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as colors from '../../colors';
import { deviceMediaQueries } from '../../sizes';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

// Styling tips: https://css-tricks.com/considerations-styling-modal/

const Overlay: React.FC = () => (
  <div className="fixed inset-0 z-40 opacity-30 bg-black" />
);

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;

  min-width: 480px;
  ${deviceMediaQueries.mobile(`
    min-width: 300px;
    width: 80%;
  `)}

  overflow: auto;
  max-width: 800px;
  max-height: 100%;

  display: flex;
  flex-direction: column;

  border: 1px solid ${colors.grey[200]};
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
`;

type ModalType = React.FC & {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Header: typeof ModalHeader;
  _Content: typeof ModalContent;
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

  const renderModal = () => {
    return (
      <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Overlay />
        </motion.div>
        <ModalContent>{children}</ModalContent>
      </div>
    );
  };

  return ReactDOM.createPortal(renderModal(), el);
};

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;

// for storybook testing etc.
Modal._Content = ModalContent;
Modal._Overlay = Overlay;
