import { observer } from 'mobx-react';
import * as React from 'react';

import styled from 'styled-components';

import EventView from '../views/EventView';

import { EmptyCard } from '../components/Card';
import EventCard from './EventCard';
import EventCalendar from './EventCalendar';

import NewEventModal from './NewEventModal';

interface Props {
  view: EventView;
}

const Container = styled.div`
  margin-top: 10px;
`;

@observer
export default class EventScreen extends React.Component<Props, {}> {
  renderEventCard() {
    const { view } = this.props;
    if (!view.selectedEvent) {
      return <EmptyCard>Выберите событие</EmptyCard>;
    }
    return view.selectedEvent!.case({
      pending: () => <EmptyCard>Загружается...</EmptyCard>,
      rejected: () => <EmptyCard>Ошибка</EmptyCard>,
      fulfilled: value => <EventCard event={value} />,
    });
  }

  render() {
    return (
      <Container>
        <EventCalendar view={this.props.view} />
        {this.renderEventCard()}
        <NewEventModal view={this.props.view} />
      </Container>
    );
  }
}
