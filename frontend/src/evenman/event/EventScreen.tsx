import { observer } from 'mobx-react-lite';

import styled from 'styled-components';

import { useListeningWebSocket } from '~/common/hooks';

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

const EventScreen: React.FC<Props> = observer(({ view }) => {
  useListeningWebSocket('ws/events/', () => {
    view.root.eventStore.updateRange(
      view.filter.startDate,
      view.filter.endDate
    );
  });

  const renderEventCard = () => {
    if (!view.selectedEvent) {
      return <EmptyCard>Выберите событие</EmptyCard>;
    }
    return view.selectedEvent.case({
      pending: () => <EmptyCard>Загружается...</EmptyCard>,
      rejected: () => <EmptyCard>Ошибка</EmptyCard>,
      fulfilled: value => <EventCard event={value} />,
    });
  };

  return (
    <Container>
      <EventCalendar view={view} />
      {renderEventCard()}
      <NewEventModal view={view} />
    </Container>
  );
});

export default EventScreen;
