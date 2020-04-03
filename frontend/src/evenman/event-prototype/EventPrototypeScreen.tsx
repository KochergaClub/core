import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import EventPrototypeCard from './EventPrototypeCard';

import Sidebar from './Sidebar';
import { EmptyCard } from '../components/Card';
import LoadingOverlay from '../components/LoadingOverlay';

import { WithSidebar } from '../WithSidebar';
import { useEventPrototypeStore } from '../common';

interface Props {
  selected_id?: number;
}

const EventPrototypeScreen: React.FC<Props> = observer(({ selected_id }) => {
  const store = useEventPrototypeStore();

  const renderCard = () => {
    if (selected_id) {
      return <EventPrototypeCard prototype_id={String(selected_id)} />;
    }

    return (
      <LoadingOverlay progress={store.state === 'fetching'}>
        <EmptyCard>Выберите прототип события</EmptyCard>
      </LoadingOverlay>
    );
  };

  return (
    <WithSidebar sidebar={<Sidebar selected_id={selected_id} />}>
      {renderCard()}
    </WithSidebar>
  );
});

export default EventPrototypeScreen;
