import { useMutation } from '@apollo/client';
import { colors, Column, Label, Row } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import EditableLink from '../components/EditableLink';
import EditableString from '../components/EditableString';
import { useUpdateMutation } from './hooks';
import {
    EvenmanEvent_DetailsFragment, EvenmanGenerateZoomLinkDocument, EvenmanSetZoomLinkDocument,
    EvenmanUpdateDocument
} from './queries.generated';
import ZoomAnalytics from './ZoomAnalytics';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const RealmDetails: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);

  const [setZoomLinkMutation] = useMutation(EvenmanSetZoomLinkDocument);

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
        <Row>
          <EditableLink
            value={event.zoom_link}
            title="Zoom"
            save={(v) =>
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
    <Row gutter={20}>
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
