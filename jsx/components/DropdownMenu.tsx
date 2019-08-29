import React, { useState, useCallback, useContext } from 'react';

import styled from 'styled-components';

import { FaCaretDown } from 'react-icons/fa';

import { colors, fonts } from '@kocherga/frontkit';

import { useExpandable } from '~/common/hooks';

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

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  user-select: none;
  border-radius: 4px;

  margin-left: 4px;
  z-index: 10;
  background-color: white;
`;

const DropdownMenu: React.FC = ({ children }) => {
  // we need to wrap ModalCreator function in an object because useState behaves funky otherwise
  const [modalWrapper, setModalWrapper] = useState<
    { modal: ModalCreator } | undefined
  >(undefined);

  const closeModal = useCallback(() => {
    setModalWrapper(undefined);
  }, []);

  const setModal = useCallback((modal: ModalCreator) => {
    setModalWrapper({ modal });
  }, []);

  const { ref, flipExpand, unexpand, expanded } = useExpandable();

  return (
    <React.Fragment>
      {modalWrapper ? modalWrapper.modal({ close: closeModal }) : null}
      <DropdownMenuContext.Provider value={{ close: unexpand, setModal }}>
        <Container ref={ref}>
          <FaCaretDown
            color={colors.grey[expanded ? 900 : 500]}
            onClick={flipExpand}
          />
          {expanded && <Dropdown>{children}</Dropdown>}
        </Container>
      </DropdownMenuContext.Provider>
    </React.Fragment>
  );
};

export const ActionContainer = styled.div`
  padding: 4px 8px;
  font-size: ${fonts.sizes.S};
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

interface LinkActionProps {
  href: string;
}
const LinkActionA = styled.a`
  color: black;
  text-decoration: none;
`;
export const LinkAction: React.FC<LinkActionProps> = ({ children, href }) => {
  return (
    <LinkActionA href={href}>
      <ActionContainer>{children}</ActionContainer>
    </LinkActionA>
  );
};

export default DropdownMenu;
