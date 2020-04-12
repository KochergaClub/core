import React from 'react';
import { observer } from 'mobx-react';

import Toggle from 'react-toggle';

import EditableLink, {
  Props as EditableLinkProps,
} from '../components/EditableLink';

import { Event, EventAnnounceTarget } from '../stores/Event';

import { Button, Column, Row } from '@kocherga/frontkit';
import { Header } from '../components/ui';

import EventShapeTimepadCategories from '../common/EventShapeTimepadCategories';
import VkGroupPicker from '../common/VkGroupPicker';
import FbGroupPicker from '../common/FbGroupPicker';

const EditableOrElement = (
  props: { el: React.ReactNode } & EditableLinkProps
) => {
  const { el, ...editableProps } = props;

  return (
    <Row>
      <EditableLink {...props} />
      &nbsp;{editableProps.value ? null : el}
    </Row>
  );
};

const AnnounceLinkTimepad = observer(({ event }: { event: Event }) =>
  event.readyForAnnounceToTimepad ? (
    <Button
      onClick={() => event.announceToTimepad()}
      small
      loading={event.isLoading}
    >
      создать
    </Button>
  ) : null
);

const AnnounceLinkVk = observer(({ event }: { event: Event }) =>
  event.readyForAnnounceToVk ? (
    <Button
      onClick={() => event.announceToVk()}
      small
      loading={event.isLoading}
    >
      создать
    </Button>
  ) : null
);

const AnnounceLinkFb = observer(({ event }: { event: Event }) => (
  <Row>
    {event.readyForAnnounceToFb ? (
      <Button
        onClick={() => event.announceToFb()}
        small
        loading={event.isLoading}
      >
        создать
      </Button>
    ) : null}
  </Row>
));

const HeadedSection: React.FC<{ title: string }> = ({ title, children }) => (
  <div>
    <Header>{title}</Header>
    <Column stretch>{children}</Column>
  </div>
);

interface Props {
  event: Event;
}

@observer
export default class EventAnnounce extends React.Component<Props> {
  render() {
    const { event } = this.props;

    if (!event.isPublic) return null;

    const genSave = (target: EventAnnounceTarget) => {
      return (value: string) => event.setAnnounceLink(target, value);
    };

    return (
      <Column stretch>
        <HeadedSection title="Timepad">
          <EventShapeTimepadCategories event={event} />
          <Row gutter={4}>
            <Toggle
              checked={event.announcements.timepad.prepaid_tickets}
              onChange={() =>
                event.setTimepadPrepaidTickets(
                  !event.announcements.timepad.prepaid_tickets
                )
              }
            />
            <div>Разрешить предоплату билетов</div>
          </Row>

          <Row gutter={4}>
            <div>Нативная регистрация</div>
            <Toggle
              checked={event.registration_type === 'timepad'}
              onChange={e =>
                event.setRegistrationType(
                  e.target.checked ? 'timepad' : 'native'
                )
              }
            />
            <div>Регистрация через Timepad</div>
          </Row>
          <EditableOrElement
            title="Timepad"
            value={event.getAnnounceLink('timepad')}
            save={genSave('timepad')}
            el={<AnnounceLinkTimepad event={event} />}
          />
        </HeadedSection>

        <HeadedSection title="Facebook">
          <FbGroupPicker
            value={event.getFbGroup || ''}
            setValue={event.setFbGroup}
          />
          {event.readyForAnnounceToFbMainPage && (
            <Button
              onClick={() => event.announceToFbMainPage()}
              small
              loading={event.isLoading}
            >
              добавить на главную страницу FB
            </Button>
          )}
          {event.readyForSharingToFbMainPage && (
            <Button
              onClick={() => event.shareToFbMainPage()}
              small
              loading={event.isLoading}
            >
              пошарить на главную страницу FB
            </Button>
          )}
          <EditableOrElement
            title="Facebook"
            value={event.getAnnounceLink('fb')}
            save={genSave('fb')}
            el={<AnnounceLinkFb event={event} />}
          />
        </HeadedSection>

        <HeadedSection title="VK">
          <VkGroupPicker
            value={event.getVkGroup || ''}
            setValue={event.setVkGroup}
          />
          <EditableOrElement
            title="ВКонтакте"
            value={event.getAnnounceLink('vk')}
            save={genSave('vk')}
            el={<AnnounceLinkVk event={event} />}
          />
        </HeadedSection>
      </Column>
    );
  }
}
