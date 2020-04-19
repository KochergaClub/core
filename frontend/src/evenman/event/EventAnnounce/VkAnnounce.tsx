import { AsyncButton } from '~/components';

import { EventAnnounceTarget } from '~/apollo/types.generated';

import VkGroupPicker from '../../common/VkGroupPicker';

import EditableOrElement from './EditableOrElement';

import {
  EvenmanEvent_DetailsFragment,
  useEvenmanAnnounceMutation,
} from '../queries.generated';
import { useSetAnnounceUrl } from './hooks';
import { useEvenmanVkAnnouncementUpdateMutation } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const AnnounceLinkVk: React.FC<Props> = ({ event }) => {
  const [announce] = useEvenmanAnnounceMutation({
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
    <AsyncButton act={announce} small>
      создать
    </AsyncButton>
  );
};

const VkAnnounce: React.FC<Props> = ({ event }) => {
  const [announcementUpdate] = useEvenmanVkAnnouncementUpdateMutation();

  const setAnnounceUrl = useSetAnnounceUrl(event.id, EventAnnounceTarget.Vk);

  return (
    <div>
      <VkGroupPicker
        value={event.announcements.vk.group || ''}
        setValue={value =>
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
