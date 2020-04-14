import { FaGlobeAfrica, FaLock } from 'react-icons/fa';
import Toggle from 'react-toggle';

import { Button, Row } from '@kocherga/frontkit';

import { EventType } from '../types';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';
import { useUpdateMutation } from '../hooks';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventTypeField: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);

  const translatedTypes: { [key in EventType]: string } = {
    public: 'Публичное',
    private: 'Приватное',
    unknown: 'Unknown',
  };

  if (event.event_type === 'unknown') {
    return (
      <Row gutter={4}>
        <div>Выберите тип:</div>
        <Button small onClick={() => update({ event_type: 'public' })}>
          <FaGlobeAfrica style={{ color: 'green' }} />
        </Button>
        <Button small onClick={() => update({ event_type: 'private' })}>
          <FaLock style={{ color: 'red' }} />
        </Button>
      </Row>
    );
  }

  return (
    <Row gutter={4}>
      <Toggle
        checked={event.event_type === 'public'}
        icons={{
          checked: <FaGlobeAfrica size={11} style={{ color: 'white' }} />,
          unchecked: <FaLock size={11} style={{ color: 'white' }} />,
        }}
        onChange={() =>
          update({
            event_type: event.event_type === 'public' ? 'private' : 'public',
          })
        }
      />
      <div>{translatedTypes[event.event_type as EventType] || 'Unknown'}</div>
    </Row>
  );
};

export default EventTypeField;
