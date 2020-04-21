import { useContext, useCallback } from 'react';

import ActionContainer from './ActionContainer';
import { DropdownMenuContext } from './contexts';

import { ModalCreator } from './contexts';

interface Props {
  title: string;
  children: ModalCreator;
}

const ModalAction: React.FC<Props> = ({ children, title }) => {
  const { close, setModal } = useContext(DropdownMenuContext);

  const openModal = useCallback(() => {
    setModal(children);
    close();
  }, [close, setModal, children]);

  return <ActionContainer onClick={openModal}>{title}</ActionContainer>;
};

export default ModalAction;
