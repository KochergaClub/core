import { action, computed, observable, configure } from 'mobx';

configure({
  enforceActions: 'observed',
});

import { API } from '~/common/api';

import { AnnouncementToolsStore } from './AnnouncementToolsStore';
import { ErrorStore } from './ErrorStore';
import { EventStore } from './EventStore';
import EventPrototypeStore from './EventPrototypeStore';
import TemplaterStore from './TemplaterStore';
import { FbStore } from './FbStore';

import View from '../views/View';
import SignInView from '../views/SignInView';
import EventView, { EventViewProps } from '../views/EventView';
import EventPrototypeView, {
  EventPrototypeViewProps,
} from '../views/EventPrototypeView';
import ScheduleView from '../views/ScheduleView';
import TemplaterView from '../views/TemplaterView';

export class RootStore {
  api: API;
  eventStore: EventStore;
  eventPrototypeStore: EventPrototypeStore;
  templaterStore: TemplaterStore;
  fbStore: FbStore;
  errorStore: ErrorStore;
  announcementToolsStore: AnnouncementToolsStore;

  @observable currentView: View;

  constructor(api: API) {
    this.api = api;
    this.eventStore = new EventStore(this);
    this.eventPrototypeStore = new EventPrototypeStore(this);
    this.fbStore = new FbStore(this.api);
    this.errorStore = new ErrorStore();
    this.announcementToolsStore = new AnnouncementToolsStore(this.api);
    this.templaterStore = new TemplaterStore(this.api);

    this.currentView = new SignInView(this);
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

  @action
  setTemplaterView() {
    this.currentView = new TemplaterView(this);
  }

  @action.bound
  switchView(name: string) {
    console.log(`switching to ${name}`);
    switch (name) {
      case 'Event':
        this.setEventView({});
        break;
      case 'Schedule':
        this.setScheduleView();
        break;
      case 'EventPrototype':
        this.setEventPrototypeView({});
        break;
      case 'Templater':
        this.setTemplaterView();
        break;
    }
  }

  weeklyScheduleImage() {
    return `/api/schedule/weekly-image`;
  }

  addError(text: string) {
    this.errorStore.addError(text);
  }

  @computed
  get currentPath(): string {
    return this.currentView.toPath;
  }
}
