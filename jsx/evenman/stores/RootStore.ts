import { action, computed, observable, configure, when } from 'mobx';

configure({
  enforceActions: 'observed',
});

import { AnnouncementToolsStore } from './AnnouncementToolsStore';
import { ApiStore } from './ApiStore';
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
  apiStore: ApiStore;
  eventStore: EventStore;
  eventPrototypeStore: EventPrototypeStore;
  templaterStore: TemplaterStore;
  fbStore: FbStore;
  errorStore: ErrorStore;
  announcementToolsStore: AnnouncementToolsStore;

  @observable currentView: View;

  constructor() {
    this.apiStore = new ApiStore(this);
    this.eventStore = new EventStore(this.apiStore);
    this.eventPrototypeStore = new EventPrototypeStore(this.apiStore);
    this.fbStore = new FbStore(this.apiStore);
    this.errorStore = new ErrorStore();
    this.announcementToolsStore = new AnnouncementToolsStore(this.apiStore);
    this.templaterStore = new TemplaterStore(this.apiStore);

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
    return `${this.apiStore.server}/schedule/weekly-image`;
  }

  addError(text: string) {
    this.errorStore.addError(text);
  }

  @computed
  get currentPath(): string {
    return this.currentView.toPath;
  }
}
