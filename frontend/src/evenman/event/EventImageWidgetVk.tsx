import React, { useCallback, useState } from 'react';

import { useMutation } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import ImageEditor from '~/components/images/ImageEditor';
import { Button, Column, Row } from '~/frontkit';

import { useEvenmanSettingsQuery } from './hooks';
import {
    EvenmanEvent_DetailsFragment, EvenmanVkAnnouncementSetImageDocument
} from './queries.generated';
import VkImageModal from './VkImageModal';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventImageWidgetVk: React.FC<Props> = ({ event }) => {
  const settingsQueryResults = useEvenmanSettingsQuery();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalIsOpen(!modalIsOpen);
  }, [modalIsOpen]);

  const [setImage] = useMutation(EvenmanVkAnnouncementSetImageDocument);

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
      <ApolloQueryResults {...settingsQueryResults}>
        {({ data: { settings } }) => (
          <ImageEditor
            onChange={onSave}
            image={event.announcements.vk.image?.original_image || undefined}
            defaults={{
              title: `[VK] ${event.title}`,
              basename: `event-vk-image-${event.id}`,
              collectionId: settings.default_events_vk_images_collection?.id,
            }}
          />
        )}
      </ApolloQueryResults>
    </Column>
  );
};

export default EventImageWidgetVk;
