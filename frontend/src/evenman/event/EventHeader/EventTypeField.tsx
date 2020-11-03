import 'react-toggle/style.css';

import { useCallback } from 'react';
import { FaGlobeAfrica, FaLock } from 'react-icons/fa';
import Toggle from 'react-toggle';

import { Button, Row } from '~/frontkit';

import { useUpdateMutation } from '../hooks';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';
import { EventType } from '../types';

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

  const setPublic = useCallback(() => {
    update({ event_type: 'public' });
  }, [update]);

  const setPrivate = useCallback(() => {
    update({ event_type: 'private' });
  }, [update]);

  if (event.event_type === 'unknown') {
    return (
      <Row gutter={4}>
        <div>Выберите тип:</div>
        <Button size="small" onClick={setPublic}>
          <FaGlobeAfrica style={{ color: 'green' }} />
        </Button>
        <Button size="small" onClick={setPrivate}>
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
