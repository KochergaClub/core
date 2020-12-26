import React from 'react';

import { Column } from '~/frontkit';

import { useUpdateMutation } from './hooks';
import { ImageEditorWithCollectionFromSettings } from './ImageEditorWithCollectionFromSettings';
import { EvenmanEvent_DetailsFragment } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventImageWidgetDefault: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);

  return (
    <Column gutter={2}>
      <header>Основная картинка:</header>
      <ImageEditorWithCollectionFromSettings
        onChange={(image_id) => update({ image_id })}
        image={event.image?.original_image || undefined}
        defaults={{
          title: event.title,
          basename: `event-image-${event.id}`,
        }}
        settingsToCollectionId={(settings) =>
          settings.default_events_images_collection?.id
        }
      />
    </Column>
  );
};

export default EventImageWidgetDefault;
