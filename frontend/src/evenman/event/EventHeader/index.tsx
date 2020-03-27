import moment from 'moment';

import { Column, Row } from '@kocherga/frontkit';

import EditableString from '../../components/EditableString';
import { Event } from '../../stores/Event';
import { MutedSpan } from '../../components/ui';

import EventDelete from './EventDelete';
import EventTypeField from './EventTypeField';
import PrototypeLink from '../PrototypeLink';
import EditableMomentSpan from '../EditableMomentSpan';

// import { useEvenmanSetRealmMutation } from '../queries.generated';

const MomentSpan = ({ m }: { m: moment.Moment }) => (
  <span>
    <b>{m.format('ddd').toUpperCase()}</b> {m.format('D MMMM')},{' '}
    {m.format('HH:mm')}
    {' ('}
    {m.fromNow()}
    {')'}
  </span>
);

interface Props {
  event: Event;
}

const EventHeader: React.FC<Props> = ({ event }) => {
  // const [setRealmMutation] = useEvenmanSetRealmMutation();

  return (
    // TODO - refactor messy layout with display: grid
    <Column centered>
      <Row spaced>
        <div style={{ flex: 1 }}>
          <EventTypeField event={event} />
        </div>
        <div style={{ fontSize: '1.4em' }}>
          <EditableString
            value={event.title}
            renderValue={ref => <strong ref={ref}>{event.title}</strong>}
            save={value => event.setTitle(value)}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <EventDelete event={event} />
        </div>
      </Row>
      <Row spaced>
        <div style={{ flex: 1 }}>
          <PrototypeLink event={event} />
        </div>

        <div>
          <EditableMomentSpan
            m={event.startMoment}
            onChange={m => event.setStart(m)}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
          }}
        >
          <small>
            <MutedSpan>
              Создано: <MomentSpan m={moment(event.created)} />
            </MutedSpan>
          </small>
        </div>
      </Row>
    </Column>
  );
};

export default EventHeader;
