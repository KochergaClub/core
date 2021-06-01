import { useCallback, useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { usePopper } from 'react-popper';

import { Placement } from '@popperjs/core';

import { useExpandable } from '~/common/hooks';
import { FloatingList } from '~/components';

import { DropdownMenuContext, ModalCreator } from './contexts';

export { Action } from './Action';
export { LinkAction } from './LinkAction';
export { ModalAction } from './ModalAction';
export { MutationAction } from './MutationAction';
export { NextLinkAction } from './NextLinkAction';
export { SmartMutationAction } from './SmartMutationAction';

const DropdownButton: React.FC<{ title: string | null }> = ({ title }) => {
  return (
    <div className="flex items-center border border-gray-200 hover:border-gray-300 rounded p-1 bg-white">
      {title ? (
        <div className="text-xs uppercase tracking-wide font-medium text-gray-500 mr-2">
          {title}
        </div>
      ) : null}
      <FaEllipsisH className="text-gray-500" />
    </div>
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
        <div className="whitespace-nowrap" ref={ref}>
          <div
            className="cursor-pointer"
            onClick={flipExpandWithPrevent}
            ref={setReferenceElement}
          >
            {render ? (
              render({ expanded })
            ) : (
              <DropdownButton title={title || null} />
            )}
          </div>
          <FloatingList
            expanded={expanded}
            ref={setPopperElement}
            style={styles.popper}
            attributes={attributes.popper || {}}
          >
            {children}
          </FloatingList>
        </div>
      </DropdownMenuContext.Provider>
    </>
  );
};

export default DropdownMenu;
