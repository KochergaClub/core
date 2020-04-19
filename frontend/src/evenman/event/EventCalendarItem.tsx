import styled from 'styled-components';

import { FaGlobeAfrica, FaLock } from 'react-icons/fa';

import { EventsEvent_SummaryFragment } from './queries.generated';

interface ProgressProps {
  private: boolean;
  selected: boolean;
  max: number;
  value: number;
}

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  font-size: 0.7em;
`;

const Icon = styled.div`
  height: 1em;
  width: 1em;
  z-index: 1;
`;

const ProgressBack = styled.div<ProgressProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: ${props =>
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
  width: ${props => (100 * props.value) / props.max}%;
  height: 100%;

  background-color: ${props =>
    props.selected ? 'hsl(120, 60%, 70%)' : 'hsl(120, 40%, 90%)'};
`;

const Progress = (props: ProgressProps) => (
  <ProgressBack {...props}>
    <ProgressBar {...props} />
  </ProgressBack>
);

const TitleContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

interface Props {
  event: EventsEvent_SummaryFragment;
  selected: boolean;
  onSelect: (id: string) => void;
}

const EventCalendarItem: React.FC<Props> = props => {
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

    max = 4;
    if (event.published) value += 1;
    if (event.announcements.timepad.link) value += 1;
    if (event.announcements.fb.link) value += 1;
    if (event.announcements.vk.link) value += 1;

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
    <Container onClick={onSelect}>
      {renderProgress()}
      <Icon>
        {event.event_type === 'public' ? (
          <FaGlobeAfrica style={{ color: 'green', verticalAlign: 'inherit' }} />
        ) : (
          <FaLock style={{ color: 'black', verticalAlign: 'inherit' }} />
        )}
      </Icon>
      <TitleContainer>
        <div>{event.title}</div>
      </TitleContainer>
    </Container>
  );
};

export default EventCalendarItem;
