import { observer } from 'mobx-react-lite';
import React from 'react';

import EventScreen from './event/EventScreen';
import EventPrototypeScreen from './event-prototype/EventPrototypeScreen';
import ScheduleScreen from './schedule/ScheduleScreen';

import { Sidebar } from './Sidebar';
import { WithSidebar } from './WithSidebar';

// import { FbLoginModal } from './FbLoginModal';

import { useRootStore } from './common';

import EventView from './views/EventView';
import EventPrototypeView from './views/EventPrototypeView';
import ScheduleView from './views/ScheduleView';

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
      return <ScheduleScreen view={store!.currentView as ScheduleView} />;
    default:
      return <div>Unknown view {store!.currentView.name}</div>;
  }
});

const Main = () => (
  <WithSidebar sidebar={<Sidebar />}>
    <Screen />
    {/* <FbLoginModal /> */}
  </WithSidebar>
);

export default Main;
