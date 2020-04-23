import { useState, useCallback } from 'react';

import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa';

import { colors, A } from '@kocherga/frontkit';

import { usePopper } from 'react-popper';
import { useExpandable } from '~/common/hooks';

import { ModalCreator, DropdownMenuContext } from './contexts';

export { default as Action } from './Action';
export { default as LinkAction } from './LinkAction';
export { default as NextLinkAction } from './NextLinkAction';
export { default as ModalAction } from './ModalAction';

const Container = styled.div`
  white-space: nowrap;
`;

const Dropdown = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  user-select: none;
  border-radius: 4px;

  z-index: 10;
  background-color: white;
  cursor: pointer;
`;

const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
  }

  &::before {
    content: '';
    transform: rotate(45deg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    background-color: white;
  }

  [data-popper-placement^='top'] > & {
    bottom: -4px;
  }

  [data-popper-placement^='bottom'] > & {
    top: -4px;
  }

  [data-popper-placement^='left'] > & {
    right: -4px;
  }

  [data-popper-placement^='right'] > & {
    left: -4px;
  }
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

  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLAnchorElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    //    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  return (
    <>
      {modalWrapper ? modalWrapper.modal({ close: closeModal }) : null}
      <DropdownMenuContext.Provider value={{ close: unexpand, setModal }}>
        <Container ref={ref}>
          <A href="#" onClick={flipExpand} ref={setReferenceElement}>
            {title || null}
            <FaCaretDown color={colors.grey[expanded ? 900 : 500]} />
          </A>
          {expanded && (
            <div
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <Dropdown>{children}</Dropdown>
              {null && (
                <Arrow ref={setArrowElement} style={styles.arrow} />
              ) /* TODO - fix visual issues */}
            </div>
          )}
        </Container>
      </DropdownMenuContext.Provider>
    </>
  );
};

export default DropdownMenu;
