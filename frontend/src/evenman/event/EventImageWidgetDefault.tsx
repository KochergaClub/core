import { Column } from '@kocherga/frontkit';

import ImageEditor from '../common/ImageEditor';
import { useUpdateMutation } from './hooks';
import { EvenmanEvent_DetailsFragment } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventImageWidgetDefault: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);

  return (
    <Column centered gutter={0}>
      <header>Основная картинка:</header>
      <ImageEditor
        onChange={(image_id) => update({ image_id })}
        image={event.image || undefined}
        defaults={{ title: event.title, basename: `event-image-${event.id}` }}
      />
    </Column>
  );
};

export default EventImageWidgetDefault;
