import { useState, useCallback } from 'react';
import { A, Column } from '@kocherga/frontkit';

import InputModal from '../InputModal';

import {
  EvenmanEvent_DetailsFragment,
  useEvenmanEventSetImageFromUrlMutation,
} from './queries.generated';
import { useUpdateMutation } from './hooks';
import ImageEditor from '../common/ImageEditor';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventImageWidgetDefault: React.FC<Props> = ({ event }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [setImageFromUrl] = useEvenmanEventSetImageFromUrlMutation();
  const update = useUpdateMutation(event.id);

  const toggleModal = useCallback(() => {
    setModalIsOpen(!modalIsOpen);
  }, [modalIsOpen]);

  const saveLink = useCallback(
    async (url: string) => {
      await setImageFromUrl({
        variables: {
          id: event.id,
          url,
        },
      });
      setModalIsOpen(false);
    },
    [event.id, setImageFromUrl]
  );

  return (
    <Column centered gutter={0}>
      <header>Основная картинка:</header>
      <small>
        <A
          href="#"
          onClick={e => {
            e.preventDefault();
            toggleModal();
          }}
        >
          добавить по ссылке
        </A>
        {modalIsOpen && (
          <InputModal
            title="Ссылка на картинку"
            description="Вставьте сюда прямую ссылку на картинку:"
            toggle={toggleModal}
            save={saveLink}
          />
        )}
      </small>
      <ImageEditor
        onChange={image_id => update({ image_id })}
        image={event.image || undefined}
      />
    </Column>
  );
};

export default EventImageWidgetDefault;
