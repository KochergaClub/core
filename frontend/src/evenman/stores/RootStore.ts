import { action, observable, configure } from 'mobx';

configure({
  enforceActions: 'observed',
});

import { API } from '~/common/api';

import { AnnouncementToolsStore } from './AnnouncementToolsStore';
import { ErrorStore } from './ErrorStore';
import { EventStore } from './EventStore';
import EventPrototypeStore from './EventPrototypeStore';

import View from '../views/View';
import EventView, { EventViewProps } from '../views/EventView';
import EventPrototypeView, {
  EventPrototypeViewProps,
} from '../views/EventPrototypeView';
import ScheduleView from '../views/ScheduleView';

export class RootStore {
  api: API;
  eventStore: EventStore;
  eventPrototypeStore: EventPrototypeStore;
  errorStore: ErrorStore;
  announcementToolsStore: AnnouncementToolsStore;

  @observable currentView: View;

  constructor(api: API) {
    this.api = api;
    this.eventStore = new EventStore(this);
    this.eventPrototypeStore = new EventPrototypeStore(this);
    this.errorStore = new ErrorStore();
    this.announcementToolsStore = new AnnouncementToolsStore(this.api);

    this.currentView = new EventView(this, {});
  }

  @action
  setEventView(props: EventViewProps) {
    if (this.currentView && this.currentView.name === 'Event') {
      (this.currentView as EventView).update(props);
    } else {
      this.currentView = new EventView(this, props);
    }
  }

  @action
  setEventPrototypeView(props: EventPrototypeViewProps) {
    if (this.currentView && this.currentView.name === 'EventPrototype') {
      (this.currentView as EventPrototypeView).update(props);
    } else {
      this.currentView = new EventPrototypeView(this, props);
    }
  }

  @action
  setScheduleView() {
    this.currentView = new ScheduleView(this);
  }

  weeklyScheduleImage() {
    return `/api/schedule/weekly-image`;
  }

  addError(text: string) {
    this.errorStore.addError(text);
  }
}
