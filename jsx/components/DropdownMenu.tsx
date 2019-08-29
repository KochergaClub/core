import React, { useState, useCallback, useContext } from 'react';

import styled from 'styled-components';

import { FaCaretDown } from 'react-icons/fa';

import { colors } from '@kocherga/frontkit';

type ModalCreator = ({ close }: { close: () => void }) => React.ReactNode;

interface DropdownMenuContextShape {
  close: () => void;
  setModal: (modal: ModalCreator) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextShape>({
  close: () => undefined,
  setModal: () => null,
});

const Container = styled.div`
  position: relative;
  cursor: pointer;
  white-space: nowrap;
`;

const Dropdown = styled.div`
  position: absolute;
  z-index: 1;

  // FIXME - copy-pasted from Picker
  border: 1px solid #888;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  user-select: none;

  margin-left: 4px;
  z-index: 10;
  background-color: white;
`;

const DropdownMenu: React.FC = ({ children }) => {
  const [revealed, setRevealed] = useState(false);

  // we need to wrap ModalCreator function in an object because useState behaves funky otherwise
  const [modalWrapper, setModalWrapper] = useState<
    { modal: ModalCreator } | undefined
  >(undefined);

  const revealDropdown = useCallback(() => {
    setRevealed(true);
  }, []);

  const hideDropdown = useCallback(() => {
    setRevealed(false);
  }, []);

  const closeModal = useCallback(() => {
    setModalWrapper(undefined);
  }, []);

  const setModal = useCallback((modal: ModalCreator) => {
    setModalWrapper({ modal });
  }, []);

  return (
    <React.Fragment>
      {modalWrapper ? modalWrapper.modal({ close: closeModal }) : null}
      <DropdownMenuContext.Provider value={{ close: hideDropdown, setModal }}>
        <Container onMouseOver={revealDropdown} onMouseLeave={hideDropdown}>
          <FaCaretDown color={colors.grey[revealed ? 900 : 500]} />
          {revealed && <Dropdown>{children}</Dropdown>}
        </Container>
      </DropdownMenuContext.Provider>
    </React.Fragment>
  );
};

export const ActionContainer = styled.div`
  padding: 8px;
  &:hover {
    background-color: ${colors.grey[100]};
  }
`;

interface ActionProps {
  act?: () => Promise<void>;
  syncAct?: () => void;
}

export const Action: React.FC<ActionProps> = ({ act, syncAct, children }) => {
  const { close } = useContext(DropdownMenuContext);

  const cb = useCallback(async () => {
    if (syncAct) {
      syncAct();
    }
    if (act) {
      await act();
    }
    close();
  }, [act]);

  return <ActionContainer onClick={cb}>{children}</ActionContainer>;
};

interface ModalActionProps {
  title: string;
  children: ModalCreator;
}
export const ModalAction: React.FC<ModalActionProps> = ({
  children,
  title,
}) => {
  const { close, setModal } = useContext(DropdownMenuContext);

  const openModal = useCallback(() => {
    setModal(children);
    close();
  }, [close, setModal]);

  return <ActionContainer onClick={openModal}>{title}</ActionContainer>;
};

export default DropdownMenu;
