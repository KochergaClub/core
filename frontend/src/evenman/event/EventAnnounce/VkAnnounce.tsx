import { useMutation } from '@apollo/client';

import { EventAnnounceTarget } from '~/apollo/types.generated';
import { AsyncButton } from '~/frontkit';

import VkGroupPicker from '../../common/VkGroupPicker';
import { EvenmanAnnounceDocument, EvenmanEvent_DetailsFragment } from '../queries.generated';
import EditableOrElement from './EditableOrElement';
import { useSetAnnounceUrl } from './hooks';
import { EvenmanVkAnnouncementUpdateDocument } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const AnnounceLinkVk: React.FC<Props> = ({ event }) => {
  const [announce] = useMutation(EvenmanAnnounceDocument, {
    variables: {
      event_id: event.id,
      target: EventAnnounceTarget.Vk,
    },
  });

  if (
    !event.published ||
    !event.description ||
    !event.summary ||
    !event.title ||
    !event.announcements.vk.image ||
    !event.announcements.vk.group
  ) {
    return null;
  }

  return (
    <AsyncButton act={announce} size="small">
      создать
    </AsyncButton>
  );
};

const VkAnnounce: React.FC<Props> = ({ event }) => {
  const [announcementUpdate] = useMutation(EvenmanVkAnnouncementUpdateDocument);

  const setAnnounceUrl = useSetAnnounceUrl(event.id, EventAnnounceTarget.Vk);

  return (
    <div>
      <VkGroupPicker
        value={event.announcements.vk.group || ''}
        setValue={(value) =>
          announcementUpdate({
            variables: { event_id: event.id, group: value },
          })
        }
      />
      <EditableOrElement
        title="ВКонтакте"
        value={event.announcements.vk.link}
        save={setAnnounceUrl}
        el={<AnnounceLinkVk event={event} />}
      />
    </div>
  );
};

export default VkAnnounce;
