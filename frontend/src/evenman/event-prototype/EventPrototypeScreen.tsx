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

  const selected = useMemo(() => {
    if (!selected_id) {
      return;
    }
    if (store.state === 'empty') {
      store.loadAll();
    }
    return store.getById(selected_id);
  }, [store, selected_id]);

  const renderCard = () => {
    if (selected) {
      return <EventPrototypeCard prototype={selected} />;
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
