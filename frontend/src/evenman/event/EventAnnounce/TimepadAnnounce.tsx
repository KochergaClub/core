import Toggle from 'react-toggle';

import { useMutation } from '@apollo/client';
import { Row } from '~/frontkit';

import { EventAnnounceTarget } from '~/apollo/types.generated';
import { AsyncButton } from '~/components';

import TimepadCategoryPicker from '../../common/TimepadCategoryPicker';
import { useUpdateMutation } from '../hooks';
import { EvenmanAnnounceDocument, EvenmanEvent_DetailsFragment } from '../queries.generated';
import EditableOrElement from './EditableOrElement';
import { useSetAnnounceUrl } from './hooks';
import { EvenmanTimepadAnnouncementUpdateDocument } from './queries.generated';

interface Props {}

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const AnnounceLinkTimepad: React.FC<Props> = ({ event }) => {
  const [announce] = useMutation(EvenmanAnnounceDocument, {
    variables: {
      event_id: event.id,
      target: EventAnnounceTarget.Timepad,
    },
  });

  if (
    !event.published ||
    !event.description ||
    !event.summary ||
    !event.title ||
    !event.image
  ) {
    return null;
  }

  return (
    <AsyncButton act={announce} small>
      создать
    </AsyncButton>
  );
};

const TimepadAnnounce: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);
  const [announcementUpdate] = useMutation(
    EvenmanTimepadAnnouncementUpdateDocument
  );

  const setAnnounceUrl = useSetAnnounceUrl(
    event.id,
    EventAnnounceTarget.Timepad
  );

  return (
    <div>
      <TimepadCategoryPicker
        code={event.announcements.timepad.category_code}
        setCode={(code) =>
          announcementUpdate({
            variables: { event_id: event.id, category_code: code || '' },
          })
        }
      />
      <Row gutter={4}>
        <Toggle
          checked={event.announcements.timepad.prepaid_tickets}
          onChange={() =>
            announcementUpdate({
              variables: {
                event_id: event.id,
                prepaid_tickets: !event.announcements.timepad.prepaid_tickets,
              },
            })
          }
        />
        <div>Разрешить предоплату билетов</div>
      </Row>

      <Row gutter={4}>
        <div>Нативная регистрация</div>
        <Toggle
          checked={event.registration_type === 'timepad'}
          onChange={(e) =>
            update({
              registration_type: e.target.checked ? 'timepad' : 'native',
            })
          }
        />
        <div>Регистрация через Timepad</div>
      </Row>
      <EditableOrElement
        title="Timepad"
        value={event.announcements.timepad.link}
        save={setAnnounceUrl}
        el={<AnnounceLinkTimepad event={event} />}
      />
    </div>
  );
};

export default TimepadAnnounce;
