import React from 'react';
import { FaGlobeAfrica, FaLock } from 'react-icons/fa';

import { CalendarItemContainer, CalendarItemIcon, CalendarItemTitle } from './calendar-helpers';
import { EventsEvent_SummaryFragment } from './queries.generated';

interface ProgressProps {
  private: boolean;
  selected: boolean;
  max: number;
  value: number;
}

const Progress: React.FC<ProgressProps> = (props) => (
  <div
    className="absolute inset-0 -z-10"
    style={{
      backgroundColor: props.selected
        ? props.private
          ? 'hsl(180, 100%, 80%)' // TODO - replace with tailwind colors/classes
          : 'hsl(0, 80%, 70%)'
        : props.private
        ? 'transparent'
        : 'hsl(0, 45%, 90%)',
    }}
  >
    <div
      className="absolute inset-y-0 left-0"
      style={{
        backgroundColor: props.selected
          ? 'hsl(120, 60%, 70%)'
          : 'hsl(120, 40%, 90%)',
        width: `${(100 * props.value) / props.max}%`,
      }}
    />
  </div>
);

interface Props {
  event: EventsEvent_SummaryFragment;
  selected: boolean;
  onSelect: (id: string) => void;
}

const EventCalendarItem: React.FC<Props> = (props) => {
  const { event } = props;

  const progressParams = () => {
    let max = 0;
    let value = 0;
    if (event.event_type !== 'public') {
      return {
        max: 1,
        value: 0,
      };
    }

    max = 2;
    if (event.published) value += 1;
    if (event.announcements.vk.link) value += 1;
    // if (event.announcements.fb.link) value += 1;
    // if (event.announcements.timepad.link) value += 1;

    return { max, value };
  };

  const renderProgress = () => {
    const { max, value } = progressParams();
    return (
      <Progress
        max={max}
        value={value}
        private={props.event.event_type !== 'public'}
        selected={props.selected}
      />
    );
  };

  const onSelect = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onSelect(props.event.id);
  };

  return (
    <CalendarItemContainer onClick={onSelect}>
      {renderProgress()}
      <CalendarItemIcon>
        {event.event_type === 'public' ? (
          <FaGlobeAfrica color="green" size="11" />
        ) : (
          <FaLock color="black" size="11" />
        )}
      </CalendarItemIcon>
      <CalendarItemTitle>{event.title}</CalendarItemTitle>
    </CalendarItemContainer>
  );
};

export default EventCalendarItem;
