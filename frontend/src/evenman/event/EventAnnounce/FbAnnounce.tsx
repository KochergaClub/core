import { AsyncButton } from '~/components';
import { EventAnnounceTarget } from '~/apollo/types.generated';

import FbGroupPicker from '../../common/FbGroupPicker';

import {
  EvenmanEvent_DetailsFragment,
  useEvenmanAnnounceMutation,
} from '../queries.generated';

import EditableOrElement from './EditableOrElement';

import { useSetAnnounceUrl } from './hooks';

const AnnounceLinkFb: React.FC<Props> = ({ event }) => {
  const [announce] = useEvenmanAnnounceMutation({
    variables: {
      event_id: event.id,
      target: EventAnnounceTarget.Fb,
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

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const FbAnnounce: React.FC<Props> = ({ event }) => {
  const setAnnounceUrl = useSetAnnounceUrl(event.id, EventAnnounceTarget.Fb);

  return (
    <div>
      <FbGroupPicker
        value={event.announcements.fb.group || ''}
        setValue={() => window.alert('TODO: not implemented on GraphQL yet')}
      />
      {/*
          event.readyForAnnounceToFbMainPage && (
            <AsyncButton act={() => event.announceToFbMainPage()} small>
            добавить на главную страницу FB
            </AsyncButton>
          )
        */}
      {/*
          event.readyForSharingToFbMainPage && (
            <AsyncButton act={() => event.shareToFbMainPage()} small>
            пошарить на главную страницу FB
            </AsyncButton>
          )
        */}
      <EditableOrElement
        title="Facebook"
        value={event.announcements.fb.link}
        save={setAnnounceUrl}
        el={<AnnounceLinkFb event={event} />}
      />
    </div>
  );
};

export default FbAnnounce;
