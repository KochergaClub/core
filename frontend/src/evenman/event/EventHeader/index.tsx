import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Column, Row } from '@kocherga/frontkit';

import { formatDate } from '~/common/utils';

import DropdownMenu, {
  NextLinkAction,
  ModalAction,
} from '~/components/DropdownMenu';

import EditableString from '../../components/EditableString';
import { MutedSpan } from '../../components/ui';

import EventDeleteModal from './EventDeleteModal';
import EventTypeField from './EventTypeField';
import EditableDateSpan from '../EditableDateSpan';

import LinkToPrototypeModal from './LinkToPrototypeModal';

import {
  EvenmanEvent_DetailsFragment,
  useEvenmanEventMoveMutation,
} from '../queries.generated';
import { useUpdateMutation } from '../hooks';
import { prototypeRoute } from '~/evenman/routes';

const DateSpan: React.FC<{ date: Date }> = ({ date }) => (
  <span>
    <b>{formatDate(date, 'EEEEEE').toUpperCase()}</b>{' '}
    {formatDate(date, 'd MMMM')}, {formatDate(date, 'HH:mm')}
    {' ('}
    {formatDistanceToNow(date, { locale: ru, addSuffix: true })}
    {')'}
  </span>
);

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventHeader: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);
  const [moveMutation] = useEvenmanEventMoveMutation();

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
            save={value => update({ title: value })}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <DropdownMenu title="Действия">
            {event.prototype && (
              <NextLinkAction {...prototypeRoute(event.prototype.id)}>
                Открыть прототип
              </NextLinkAction>
            )}
            <ModalAction title="Заполнить из прототипа">
              {({ close }) => (
                <LinkToPrototypeModal close={close} event={event} />
              )}
            </ModalAction>
            <ModalAction title="Удалить">
              {({ close }) => <EventDeleteModal close={close} event={event} />}
            </ModalAction>
          </DropdownMenu>
        </div>
      </Row>
      <Row spaced>
        <div style={{ flex: 1 }}>&nbsp;</div>

        <div>
          <EditableDateSpan
            date={new Date(event.start)}
            onChange={date =>
              moveMutation({
                variables: {
                  event_id: event.id,
                  start: date.toISOString(),
                },
              })
            }
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
              Создано: <DateSpan date={new Date(event.created)} />
            </MutedSpan>
          </small>
        </div>
      </Row>
    </Column>
  );
};

export default EventHeader;
