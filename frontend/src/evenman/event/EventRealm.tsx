import { useMutation } from '@apollo/client';

import { AsyncButton, colors, Column, Label, Row } from '~/frontkit';

import EditableLink from '../components/EditableLink';
import { EditableString } from '../components/EditableString';
import { useUpdateMutation } from './hooks';
import {
    EvenmanEvent_DetailsFragment, EvenmanGenerateZoomLinkDocument, EvenmanUpdateDocument
} from './queries.generated';
import ZoomAnalytics from './ZoomAnalytics';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const RealmDetails: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);

  const [generateZoomLinkMutation] = useMutation(
    EvenmanGenerateZoomLinkDocument,
    {
      variables: { id: event.id },
    }
  );

  switch (event.realm) {
    case 'offline':
      return (
        <Row vCentered>
          <Label>Комната:</Label>
          <EditableString
            value={event.location}
            renderValue={(ref) => <span ref={ref}>{event.location}</span>}
            save={(v) => update({ location: v })}
          />
        </Row>
      );
    case 'online':
      return (
        <Row vCentered>
          <EditableLink
            value={event.zoom_link}
            title="Zoom"
            save={(v) => update({ zoom_link: v })}
          />
          {event.zoom_link ? null : (
            <AsyncButton
              act={generateZoomLinkMutation}
              size="small"
              kind="primary"
            >
              Сгенерировать
            </AsyncButton>
          )}
          <ZoomAnalytics event={event} />
        </Row>
      );
    default:
      return null;
  }
};

const EventRealm: React.FC<Props> = ({ event }) => {
  const [updateMutation, { loading }] = useMutation(EvenmanUpdateDocument);

  return (
    <Column gutter={16}>
      <Column>
        {[
          { value: 'offline', title: 'Офлайн' },
          { value: 'online', title: 'Онлайн' },
        ].map((item) => (
          <Row key={item.value} vCentered>
            <input
              type="radio"
              name="realm"
              id={'realm--' + item.value}
              value={item.value}
              checked={event.realm === item.value}
              onChange={() =>
                updateMutation({
                  variables: {
                    input: { event_id: event.id, realm: item.value },
                  },
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
    </Column>
  );
};

export default EventRealm;
