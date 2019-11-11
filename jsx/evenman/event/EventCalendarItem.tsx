import React from 'react';
import { observer } from 'mobx-react';

import styled from 'styled-components';

import { FaGlobe, FaLock } from 'react-icons/fa';

import { Event } from '../stores/Event';

interface ProgressProps {
  private: boolean;
  selected: boolean;
  max: number;
  value: number;
}

interface Props {
  event: Event;
  selected: boolean;
  onSelect: (id: string) => void;
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

@observer
export default class EventCalendarItem extends React.Component<Props> {
  progressParams() {
    const { event } = this.props;

    let max = 0;
    let value = 0;
    if (event.type !== 'public') {
      return {
        max: 1,
        value: 0,
      };
    }

    // TODO - move this code to Event class
    max = 4;
    if (event.published) value += 1;
    if (event.announcements.timepad.link) value += 1;
    if (event.announcements.fb.link) value += 1;
    if (event.announcements.vk.link) value += 1;

    return { max, value };
  }

  renderProgress() {
    const { max, value } = this.progressParams();
    return (
      <Progress
        max={max}
        value={value}
        private={this.props.event.type !== 'public'}
        selected={this.props.selected}
      />
    );
  }

  onSelect = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.onSelect(this.props.event.id);
  };

  render() {
    const { event } = this.props;
    return (
      <Container onClick={this.onSelect}>
        {this.renderProgress()}
        <Icon>
          {event.type === 'public' ? (
            <FaGlobe style={{ color: 'green', verticalAlign: 'inherit' }} />
          ) : (
            <FaLock style={{ color: 'black', verticalAlign: 'inherit' }} />
          )}
        </Icon>
        <TitleContainer>
          <div>{event.title}</div>
        </TitleContainer>
      </Container>
    );
  }
}
