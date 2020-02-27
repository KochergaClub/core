import { observer } from 'mobx-react-lite';

import EventScreen from './event/EventScreen';
import EventPrototypeScreen from './event-prototype/EventPrototypeScreen';
import ScheduleScreen from './schedule/ScheduleScreen';

import { Sidebar } from './Sidebar';
import { WithSidebar } from './WithSidebar';

import { useRootStore } from './common';

import EventView from './views/EventView';
import EventPrototypeView from './views/EventPrototypeView';

const Screen = observer(() => {
  const store = useRootStore();

  switch (store!.currentView.name) {
    case 'Event':
      return <EventScreen view={store!.currentView as EventView} />;
    case 'EventPrototype':
      return (
        <EventPrototypeScreen view={store!.currentView as EventPrototypeView} />
      );
    case 'Schedule':
      return <ScheduleScreen />;
    default:
      return <div>Unknown view {store!.currentView.name}</div>;
  }
});

const Main = () => (
  <WithSidebar sidebar={<Sidebar />}>
    <Screen />
  </WithSidebar>
);

export default Main;
