import { useContext, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import { Button, Modal } from '~/frontkit';
import { allBlockComponents, KnownBlockFragment } from '~/wagtail/blocks';

import { BlockFormModal } from '../BlockFormModal';
import { EditBlocksContext } from '../EditWagtailBlocks';

interface Props {
  position: number;
  show: boolean;
}

type Typename = KnownBlockFragment['__typename'];

export const AddControls: React.FC<Props> = ({ position, show }) => {
  const { dispatch } = useContext(EditBlocksContext);
  const [showModal, setShowModal] = useState(false);
  const [typename, setTypename] = useState<Typename | undefined>(undefined);

  const act = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTypename(undefined);
  };

  const pick = (typename: Typename) => {
    setShowModal(false);
    setTypename(typename);
  };

  const add = async (block: KnownBlockFragment) => {
    dispatch({
      type: 'ADD_BLOCK',
      payload: { block, position },
    });
    closeModal();
  };

  // TODO - load from server?
  const typenames = Object.keys(allBlockComponents) as Typename[];

  return (
    <div>
      {show ? (
        <a
          href="#"
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-8 text-primary-500 bg-white"
          onClick={act}
        >
          <FaPlusCircle size={32} />
        </a>
      ) : null}
      {typename ? (
        <BlockFormModal
          close={closeModal}
          typename={typename}
          post={add}
          modalTitle={`Создание блока ${typename}`}
        />
      ) : showModal ? (
        <Modal>
          <Modal.Header close={closeModal}>Выберите тип блока</Modal.Header>
          <Modal.Body>
            <div className="space-x-1 space-y-1 max-w-xl">
              {typenames.map((typename) => (
                <Button key={typename} onClick={() => pick(typename)}>
                  {typename}
                </Button>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
    </div>
  );
};
