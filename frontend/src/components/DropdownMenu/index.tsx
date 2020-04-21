import { useState, useCallback } from 'react';

import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa';

import { colors, A } from '@kocherga/frontkit';

import { useExpandable } from '~/common/hooks';

import { ModalCreator, DropdownMenuContext } from './contexts';

export { default as Action } from './Action';
export { default as LinkAction } from './LinkAction';
export { default as NextLinkAction } from './NextLinkAction';
export { default as ModalAction } from './ModalAction';

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

interface Props {
  title?: string;
}

const DropdownMenu: React.FC<Props> = ({ title, children }) => {
  // Note that modalWrapper belongs here and not in <ModalAction> because it should be open even if dropdown is collapsed.
  // We need to wrap ModalCreator function in an object because useState behaves funky otherwise.
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
    <>
      {modalWrapper ? modalWrapper.modal({ close: closeModal }) : null}
      <DropdownMenuContext.Provider value={{ close: unexpand, setModal }}>
        <Container ref={ref}>
          <A href="#" onClick={flipExpand}>
            {title || null}
            <FaCaretDown color={colors.grey[expanded ? 900 : 500]} />
          </A>
          {expanded && <Dropdown>{children}</Dropdown>}
        </Container>
      </DropdownMenuContext.Provider>
    </>
  );
};

export default DropdownMenu;
