import { useCallback, useState } from 'react';

import { Button, Column, Row } from '@kocherga/frontkit';

import ImageEditor from '~/components/images/ImageEditor';

import {
    EvenmanEvent_DetailsFragment, useEvenmanVkAnnouncementSetImageMutation
} from './queries.generated';
import VkImageModal from './VkImageModal';

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
    (image_id) => setImage({ variables: { event_id: event.id, image_id } }),
    [event.id, setImage]
  );

  return (
    <Column centered gutter={0}>
      <header>
        <Row>
          <span>Картинка для ВК:</span>
          <Button
            size="small"
            kind="primary"
            onClick={(e) => {
              e.preventDefault();
              toggleModal();
            }}
          >
            создать
          </Button>
        </Row>
      </header>
      {modalIsOpen && (
        <VkImageModal event={event} close={toggleModal} onSave={onSave} />
      )}
      <ImageEditor
        onChange={onSave}
        image={event.announcements.vk.image || undefined}
        defaults={{
          title: `[VK] ${event.title}`,
          basename: `event-vk-image-${event.id}`,
        }}
      />
    </Column>
  );
};

export default EventImageWidgetVk;
