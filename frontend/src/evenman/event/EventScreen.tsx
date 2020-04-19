import styled from 'styled-components';

import { EmptyCard } from '../components/Card';
import EventCard from './EventCard';
import EventCalendar from './EventCalendar';

interface Props {
  selected_id?: string;
}

const Container = styled.div`
  margin-top: 10px;
`;

const EventScreen: React.FC<Props> = ({ selected_id }) => {
  return (
    <Container>
      <EventCalendar selected_id={selected_id} />
      {selected_id ? (
        <EventCard id={selected_id} />
      ) : (
        <EmptyCard>Выберите событие</EmptyCard>
      )}
    </Container>
  );
};

export default EventScreen;
