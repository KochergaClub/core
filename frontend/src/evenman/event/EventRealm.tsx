import { colors, Row, Column, Label } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import EditableString from '../components/EditableString';
import EditableLink from '../components/EditableLink';

import {
  useEvenmanSetZoomLinkMutation,
  useEvenmanGenerateZoomLinkMutation,
  EvenmanEvent_DetailsFragment,
  useEvenmanUpdateMutation,
} from './queries.generated';
import { useUpdateMutation } from './hooks';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const RealmDetails: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);

  const [setZoomLinkMutation] = useEvenmanSetZoomLinkMutation();

  const [generateZoomLinkMutation] = useEvenmanGenerateZoomLinkMutation({
    variables: { id: event.id },
  });

  switch (event.realm) {
    case 'offline':
      return (
        <Row vCentered>
          <Label>Комната:</Label>
          <EditableString
            value={event.location}
            renderValue={ref => <span ref={ref}>{event.location}</span>}
            save={v => update({ location: v })}
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
              setZoomLinkMutation({
                variables: { id: event.id, link: v },
              })
            }
          />
          {event.zoom_link ? null : (
            <AsyncButton act={generateZoomLinkMutation} small>
              Сгенерировать
            </AsyncButton>
          )}
          {event.zoom_meeting && (
            <div>
              Участники по статистике Zoom'а:{' '}
              {event.zoom_meeting.participants_count}
            </div>
          )}
        </Row>
      );
    default:
      return null;
  }
};

const EventRealm: React.FC<Props> = ({ event }) => {
  const [updateMutation, { loading }] = useEvenmanUpdateMutation();

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
                updateMutation({
                  variables: { id: event.id, realm: item.value },
                })
              }
            />
            <label
              htmlFor={'realm--' + item.value}
              style={loading ? { color: colors.grey[500] } : {}}
            >
              {item.title}
            </label>
          </Row>
        ))}
      </Column>
      <RealmDetails event={event} />
    </Row>
  );
};

export default EventRealm;
