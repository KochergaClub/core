import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as colors from '../../colors';
import { deviceMediaQueries } from '../../sizes';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

// Styling tips: https://css-tricks.com/considerations-styling-modal/

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  opacity: 0.3;
  background-color: black;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;

  min-width: 320px;
  ${deviceMediaQueries.desktop(`
    min-width: 480px;
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

interface ModalWrapperProps {
  isOpen: boolean;
}

const ModalWrapper = styled.div<ModalWrapperProps>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

interface Props {
  onOpened?: () => void;
  isOpen?: boolean; // defaults to true; deprecated
  overflow?: string; // deprecated
}

type ModalType = React.FC<Props> & {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Header: typeof ModalHeader;
  _Content: typeof ModalContent;
  _Overlay: typeof Overlay;
};

export const Modal: ModalType = (props) => {
  const [el] = React.useState(() => document.createElement('div'));

  React.useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  if (props.overflow) {
    console.warn('Modal.overflow prop is deprecated');
  }

  const isOpen = props.isOpen === undefined ? true : props.isOpen;

  React.useEffect(() => {
    isOpen && props.onOpened && props.onOpened();
  }, [isOpen, props.onOpened]);

  const renderModal = () => {
    return (
      <ModalWrapper isOpen={isOpen}>
        <Overlay id="modal-overlay" />
        <ModalContent>{props.children}</ModalContent>
      </ModalWrapper>
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
