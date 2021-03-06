import { useCallback, useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { usePopper } from 'react-popper';
import styled from 'styled-components';

import { Placement } from '@popperjs/core';

import { useExpandable } from '~/common/hooks';
import { FloatingList } from '~/components';
import { colors, fonts } from '~/frontkit';

import { DropdownMenuContext, ModalCreator } from './contexts';

export { default as Action } from './Action';
export { default as LinkAction } from './LinkAction';
export { default as ModalAction } from './ModalAction';
export { MutationAction } from './MutationAction';
export { default as NextLinkAction } from './NextLinkAction';
export { SmartMutationAction } from './SmartMutationAction';

const Container = styled.div`
  white-space: nowrap;
`;

const OuterWrapper = styled.div`
  cursor: pointer;
`;

const DropdownButtonContainer = styled.div`
  border: 1px solid ${colors.grey[200]};
  border-radius: 4px;
  padding: 4px;
  line-height: 0;
  background-color: white;

  display: flex;
  flex-direction: row;
  align-items: center;

  > div {
    font-size: ${fonts.sizes.XS};
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 500;
    color: ${colors.grey[700]};
  }

  > * + * {
    margin-left: 8px;
  }

  &:hover {
    border-color: ${colors.grey[300]};
  }
`;

const DropdownButton: React.FC<{ title: string | null }> = ({ title }) => {
  return (
    <DropdownButtonContainer>
      {title ? <div>{title}</div> : null}
      <FaEllipsisH color={colors.grey[600]} />
    </DropdownButtonContainer>
  );
};

interface Props {
  title?: string;
  render?: ({ expanded }: { expanded: boolean }) => React.ReactElement;
  placement?: Placement;
  onExpandChange?: (expanded: boolean) => void; // some outside components can be interested when Dropdown becomes expanded or unexpanded
}

const DropdownMenu: React.FC<Props> = ({
  placement = 'bottom-start',
  title,
  children,
  render,
  onExpandChange,
}) => {
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

  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(expanded);
    }
  }, [expanded, onExpandChange]);

  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
  });

  const flipExpandWithPrevent = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      flipExpand();
    },
    [flipExpand]
  );

  return (
    <>
      {modalWrapper ? modalWrapper.modal({ close: closeModal }) : null}
      <DropdownMenuContext.Provider value={{ close: unexpand, setModal }}>
        <Container ref={ref}>
          <OuterWrapper
            onClick={flipExpandWithPrevent}
            ref={setReferenceElement}
          >
            {render ? (
              render({ expanded })
            ) : (
              <DropdownButton title={title || null} />
            )}
          </OuterWrapper>
          <FloatingList
            expanded={expanded}
            ref={setPopperElement}
            style={styles.popper}
            attributes={attributes.popper || {}}
          >
            {children}
          </FloatingList>
        </Container>
      </DropdownMenuContext.Provider>
    </>
  );
};

export default DropdownMenu;
