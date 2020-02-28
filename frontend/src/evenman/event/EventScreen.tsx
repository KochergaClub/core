import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { fromPromise } from 'mobx-utils';

import styled from 'styled-components';

import { useListeningWebSocket } from '~/common/hooks';

import { useRootStore } from '../common';
import { EventFilter } from '../stores/EventFilter';

import { EmptyCard } from '../components/Card';
import EventCard from './EventCard';
import EventCalendar from './EventCalendar';

interface Props {
  selected_id?: string;
}

const Container = styled.div`
  margin-top: 10px;
`;

const EventScreen: React.FC<Props> = observer(({ selected_id }) => {
  const root = useRootStore();
  const filter = useMemo(() => {
    return new EventFilter(root.eventStore);
  }, [root]);

  useListeningWebSocket('ws/events/', () => {
    root.eventStore.updateRange(filter.startDate, filter.endDate);
  });

  const renderEventCard = () => {
    if (!selected_id) {
      return <EmptyCard>Выберите событие</EmptyCard>;
    }
    const event = fromPromise(root.eventStore.getEvent(selected_id));

    return event.case({
      pending: () => <EmptyCard>Загружается...</EmptyCard>,
      rejected: () => <EmptyCard>Ошибка</EmptyCard>,
      fulfilled: value => <EventCard event={value} />,
    });
  };

  return (
    <Container>
      <EventCalendar selected_id={selected_id} filter={filter} />
      {renderEventCard()}
    </Container>
  );
});

export default EventScreen;
