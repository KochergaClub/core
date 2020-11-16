import { useCallback, useContext } from 'react';
import { VscWindow } from 'react-icons/vsc';

import { ActionLayout } from './ActionLayout';
import { DropdownMenuContext, ModalCreator } from './contexts';

interface Props {
  title: string;
  icon?: React.ElementType;
  children: ModalCreator;
}

const ModalAction: React.FC<Props> = ({ children, title, icon }) => {
  const { close, setModal } = useContext(DropdownMenuContext);

  const openModal = useCallback(() => {
    setModal(children);
    close();
  }, [close, setModal, children]);

  return (
    <ActionLayout onClick={openModal} title={title} icon={icon || VscWindow} />
  );
};

export default ModalAction;
