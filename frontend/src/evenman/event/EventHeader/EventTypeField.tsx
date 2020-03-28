import { FaGlobeAfrica, FaLock } from 'react-icons/fa';
import Toggle from 'react-toggle';

import { Button, Row } from '@kocherga/frontkit';

import { Event, EventType } from '../../stores/Event';

interface Props {
  event: Event;
}

const EventTypeField: React.FC<Props> = ({ event }) => {
  const translatedTypes: { [key in EventType]: string } = {
    public: 'Публичное',
    private: 'Приватное',
    unknown: 'Unknown',
  };

  if (event.type === 'unknown') {
    return (
      <Row gutter={4}>
        <div>Выберите тип:</div>
        <Button small onClick={() => event.setType('public')}>
          <FaGlobeAfrica style={{ color: 'green' }} />
        </Button>
        <Button small onClick={() => event.setType('private')}>
          <FaLock style={{ color: 'red' }} />
        </Button>
      </Row>
    );
  }

  return (
    <Row gutter={4}>
      <Toggle
        checked={event.type === 'public'}
        icons={{
          checked: <FaGlobeAfrica size={11} style={{ color: 'white' }} />,
          unchecked: <FaLock size={11} style={{ color: 'white' }} />,
        }}
        onChange={() => event.invertType()}
      />
      <div>{translatedTypes[event.type] || 'Unknown'}</div>
    </Row>
  );
};

export default EventTypeField;
