import { configure } from 'mobx';

configure({
  enforceActions: 'observed',
});

import { API } from '~/common/api';

import { AnnouncementToolsStore } from './AnnouncementToolsStore';

export class RootStore {
  api: API;
  announcementToolsStore: AnnouncementToolsStore;

  constructor(api: API) {
    this.api = api;
    this.announcementToolsStore = new AnnouncementToolsStore(this.api);
  }

  weeklyScheduleImage() {
    return `/api/schedule/weekly-image`;
  }
}
