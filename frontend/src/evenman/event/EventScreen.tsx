import { EmptyCard } from '../components/Card';
import EventCalendar from './EventCalendar';
import EventCard from './EventCard';

interface Props {
  selected_id?: string;
}

const EventScreen: React.FC<Props> = ({ selected_id }) => {
  return (
    <div className="mt-3">
      <EventCalendar selected_id={selected_id} />
      {selected_id ? (
        <EventCard id={selected_id} />
      ) : (
        <EmptyCard>Выберите событие</EmptyCard>
      )}
    </div>
  );
};

export default EventScreen;
