import { useContext, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import styled from 'styled-components';

import { Button, Column, Modal } from '@kocherga/frontkit';

import { allBlockComponents, KnownBlockFragment } from '~/wagtail/blocks';

import { EditBlocksContext } from '../EditWagtailBlocks';
import ModalBlockForm from '../ModalBlockForm';

const AddControlsContainer = styled.div`
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1; /* transform creates a new stacking context, so this is necessary for inner Dropdown */

  & > a {
    height: 32px;
    display: block;
  }
`;

interface Props {
  position: number;
}

type Typename = KnownBlockFragment['__typename'];

const AddControls: React.FC<Props> = ({ position }) => {
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

  // TODO - load from server
  const typenames = Object.keys(allBlockComponents) as Typename[];

  return (
    <AddControlsContainer className="controls">
      <a href="#" onClick={act}>
        <FaPlusCircle size={32} />
      </a>
      {typename ? (
        <ModalBlockForm
          close={closeModal}
          typename={typename}
          post={add}
          modalTitle={`Создание блока ${typename}`}
        />
      ) : showModal ? (
        <Modal>
          <Modal.Header toggle={closeModal}>Выберите тип блока</Modal.Header>
          <Modal.Body>
            <Column>
              {typenames.map((typename) => (
                <Button key={typename} onClick={() => pick(typename)}>
                  {typename}
                </Button>
              ))}
            </Column>
          </Modal.Body>
        </Modal>
      ) : null}
    </AddControlsContainer>
  );
};

export default AddControls;
