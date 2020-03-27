import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { colors, Row, Column } from '@kocherga/frontkit';

import { Event } from '../stores/Event';
import EditableString from '../components/EditableString';

import { useEvenmanSetRealmMutation } from './queries.generated';

interface Props {
  event: Event;
}

const EventRealm: React.FC<Props> = observer(({ event }) => {
  const [reloading, setReloading] = useState(false);

  const [setRealmMutation, { loading: mutating }] = useEvenmanSetRealmMutation({
    onCompleted: async () => {
      setReloading(true);
      await event.reload();
      setReloading(false);
    },
  });

  return (
    <Row gutter={20}>
      <Column>
        {[
          { value: 'offline', title: 'Офлайн' },
          { value: 'online', title: 'Онлайн' },
        ].map(item => (
          <Row key={item.value} vCentered>
            <input
              type="radio"
              name="realm"
              id={'realm--' + item.value}
              value={item.value}
              checked={event.realm === item.value}
              onChange={() =>
                setRealmMutation({
                  variables: { id: event.id, realm: item.value },
                })
              }
            />
            <label
              htmlFor={'realm--' + item.value}
              style={mutating || reloading ? { color: colors.grey[500] } : {}}
            >
              {item.title}
            </label>
          </Row>
        ))}
      </Column>
      {event.realm === 'offline' ? (
        <Row>
          <div>Комната:</div>
          <EditableString
            value={event.location}
            renderValue={ref => <span ref={ref}>{event.location}</span>}
            save={v => event.setLocation(v)}
          />
        </Row>
      ) : null}
    </Row>
  );
});

export default EventRealm;
