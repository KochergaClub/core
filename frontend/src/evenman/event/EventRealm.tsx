import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { colors, Row, Column } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import { Event } from '../stores/Event';
import EditableString from '../components/EditableString';
import EditableLink from '../components/EditableLink';

import {
  useEvenmanSetRealmMutation,
  useEvenmanSetZoomLinkMutation,
  useEvenmanGenerateZoomLinkMutation,
} from './queries.generated';

interface Props {
  event: Event;
}

const RealmDetails: React.FC<Props> = observer(({ event }) => {
  const [setZoomLinkMutation] = useEvenmanSetZoomLinkMutation({
    onCompleted: async () => {
      await event.reload();
    },
  });

  const [generateZoomLinkMutation] = useEvenmanGenerateZoomLinkMutation({
    variables: { id: event.id },
    onCompleted: async () => {
      await event.reload();
    },
  });

  switch (event.realm) {
    case 'offline':
      return (
        <Row>
          <div>Комната:</div>
          <EditableString
            value={event.location}
            renderValue={ref => <span ref={ref}>{event.location}</span>}
            save={v => event.setLocation(v)}
          />
        </Row>
      );
    case 'online':
      return (
        <Row>
          <EditableLink
            value={event.zoom_link}
            title="Zoom"
            save={v =>
              setZoomLinkMutation({ variables: { id: event.id, link: v } })
            }
          />
          <AsyncButton act={generateZoomLinkMutation} small>
            Сгенерировать
          </AsyncButton>
        </Row>
      );
    default:
      return null;
  }
});

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
      <RealmDetails event={event} />
    </Row>
  );
});

export default EventRealm;
