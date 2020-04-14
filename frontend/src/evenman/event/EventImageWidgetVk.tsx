import { useState, useCallback } from 'react';

import VkImageModal from './VkImageModal';
import { A, Column } from '@kocherga/frontkit';
import ImageEditor from '../common/ImageEditor';
import {
  EvenmanEvent_DetailsFragment,
  useEvenmanVkAnnouncementSetImageMutation,
} from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventImageWidgetVk: React.FC<Props> = ({ event }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalIsOpen(!modalIsOpen);
  }, [modalIsOpen]);

  const [setImage] = useEvenmanVkAnnouncementSetImageMutation();

  const onSave = useCallback(
    image_id => setImage({ variables: { event_id: event.id, image_id } }),
    [event.id, setImage]
  );

  return (
    <Column centered gutter={0}>
      <header>Картинка для ВК:</header>
      <small>
        <A
          href="#"
          onClick={e => {
            e.preventDefault();
            toggleModal();
          }}
        >
          создать
        </A>
        {modalIsOpen && (
          <VkImageModal event={event} close={toggleModal} onSave={onSave} />
        )}
      </small>
      <ImageEditor
        onChange={onSave}
        image={event.announcements.vk.image || undefined}
      />
    </Column>
  );
};

export default EventImageWidgetVk;
