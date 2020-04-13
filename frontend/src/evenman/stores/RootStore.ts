import { configure } from 'mobx';

configure({
  enforceActions: 'observed',
});

import { API } from '~/common/api';

import { AnnouncementToolsStore } from './AnnouncementToolsStore';
import { EventStore } from './EventStore';

export class RootStore {
  api: API;
  eventStore: EventStore;
  announcementToolsStore: AnnouncementToolsStore;

  constructor(api: API) {
    this.api = api;
    this.eventStore = new EventStore(this);
    this.announcementToolsStore = new AnnouncementToolsStore(this.api);
  }

  weeklyScheduleImage() {
    return `/api/schedule/weekly-image`;
  }
}
