import React from 'react';
import { FaGlobeAfrica, FaLock } from 'react-icons/fa';
import styled from 'styled-components';

import { CalendarItemContainer, CalendarItemIcon, CalendarItemTitle } from './calendar-helpers';
import { EventsEvent_SummaryFragment } from './queries.generated';

interface ProgressProps {
  private: boolean;
  selected: boolean;
  max: number;
  value: number;
}

const ProgressBack = styled.div<ProgressProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: ${(props) =>
    props.selected
      ? props.private
        ? 'hsl(180, 100%, 80%)'
        : 'hsl(0, 80%, 70%)'
      : props.private
      ? 'transparent'
      : 'hsl(0, 45%, 90%)'};
`;

const ProgressBar = styled.div<ProgressProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(props) => (100 * props.value) / props.max}%;
  height: 100%;

  background-color: ${(props) =>
    props.selected ? 'hsl(120, 60%, 70%)' : 'hsl(120, 40%, 90%)'};
`;

const Progress = (props: ProgressProps) => (
  <ProgressBack {...props}>
    <ProgressBar {...props} />
  </ProgressBack>
);

type Props = {
  event: EventsEvent_SummaryFragment;
  selected: boolean;
  onSelect: (id: string) => void;
};

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
