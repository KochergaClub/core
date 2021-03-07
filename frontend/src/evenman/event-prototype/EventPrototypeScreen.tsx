import { WithSidebar } from '~/frontkit';

import { EmptyCard } from '../components/Card';
import EventPrototypeCard from './EventPrototypeCard';
import Sidebar from './Sidebar';

interface Props {
  selected_id?: string;
}

const EventPrototypeScreen: React.FC<Props> = ({ selected_id }) => {
  const renderCard = () => {
    if (selected_id) {
      return <EventPrototypeCard prototype_id={selected_id} />;
    }

    return <EmptyCard>Выберите прототип события</EmptyCard>;
  };

  return (
    <WithSidebar sidebar={<Sidebar selected_id={selected_id} />}>
      {renderCard()}
    </WithSidebar>
  );
};

export default EventPrototypeScreen;
