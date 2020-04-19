import EventPrototypeCard from './EventPrototypeCard';

import Sidebar from './Sidebar';
import { EmptyCard } from '../components/Card';

import { WithSidebar } from '../WithSidebar';

interface Props {
  selected_id?: number;
}

const EventPrototypeScreen: React.FC<Props> = ({ selected_id }) => {
  const renderCard = () => {
    if (selected_id) {
      return <EventPrototypeCard prototype_id={String(selected_id)} />;
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
