import 'react-toggle/style.css';

import Toggle from 'react-toggle';

import { A, Row } from '~/frontkit';

import { useUpdateMutation } from '../hooks';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const Publish: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);

  if (event.event_type !== 'public') {
    return null;
  }

  return (
    <Row gutter={4}>
      <Toggle
        checked={event.published}
        onChange={() => update({ published: !event.published })}
      />
      <div>
        {event.published ? (
          <A href={`/events/${event.id}`}>Опубликовано</A>
        ) : (
          'Опубликовано'
        )}
      </div>
    </Row>
  );
};

export default Publish;
