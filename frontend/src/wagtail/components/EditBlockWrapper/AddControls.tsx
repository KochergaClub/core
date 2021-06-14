import React, { useContext, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { Button, Modal } from '~/frontkit';
import { isKnownBlockTypename, KnownBlockFragment, KnownBlockTypename } from '~/wagtail/blocks';

import { BlockFormModal } from '../BlockFormModal';
import { EditBlocksContext } from '../EditWagtailBlocks';
import { WagtailAllBlockStructuresDocument } from '../queries.generated';

interface Props {
  position: number;
  show: boolean;
}

const TypenamePicker: React.FC<{
  close: () => void;
  pick: (t: string) => void;
}> = ({ close, pick }) => {
  const queryResults = useQuery(WagtailAllBlockStructuresDocument);

  return (
    <Modal>
      <Modal.Header close={close}>Выберите тип блока</Modal.Header>
      <Modal.Body>
        <ApolloQueryResults {...queryResults}>
          {({ data: { result } }) => (
            <div className="grid grid-cols-2 max-w-xl gap-1">
              {result.map(({ typename, structure }) => (
                <React.Fragment key={typename}>
                  <div>{structure.group}</div>
                  <Button onClick={() => pick(typename)}>
                    {structure.label}
                  </Button>
                </React.Fragment>
              ))}
            </div>
          )}
        </ApolloQueryResults>
      </Modal.Body>
    </Modal>
  );
};

export const AddControls: React.FC<Props> = ({ position, show }) => {
  const { dispatch } = useContext(EditBlocksContext);
  const [showModal, setShowModal] = useState(false);
  const [typename, setTypename] = useState<KnownBlockTypename | undefined>(
    undefined
  );

  const act = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTypename(undefined);
  };

  const pick = (typename: string) => {
    setShowModal(false);
    if (isKnownBlockTypename(typename)) {
      setTypename(typename);
    } else {
      window.alert(`Тип ${typename} не настроен на фронтенде`);
    }
  };

  const add = async (block: KnownBlockFragment) => {
    dispatch({
      type: 'ADD_BLOCK',
      payload: { block, position },
    });
    closeModal();
  };

  return (
    <div>
      {show ? (
        <a
          href="#"
          className="absolute z-20 -bottom-4 left-1/2 transform -translate-x-1/2 h-8 text-primary-500 bg-white rounded-full"
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
        <TypenamePicker close={closeModal} pick={pick} />
      ) : null}
    </div>
  );
};
