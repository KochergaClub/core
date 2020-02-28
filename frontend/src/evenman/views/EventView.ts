import { action, computed, observable, runInAction } from 'mobx';
import { fromPromise } from 'mobx-utils';

import { RootStore } from '../stores/RootStore';
import { EventFilter } from '../stores/EventFilter';

import View from './View';

export interface EventViewProps {
  id?: string;
  filter?: object;
}

class NewEventSubview {
  @observable show: boolean;
  @observable creating: boolean;
  @observable title: string;
  @observable date: string;
  @observable time: string;

  constructor() {
    this.show = false;
    this.creating = false;
    this.title = '';
    this.date = '';
    this.time = '';
  }

  @action.bound
  openForm(date?: string) {
    this.show = true;
    this.date = date || '';
  }

  @action.bound
  toggleForm() {
    this.show = !this.show;
  }

  @computed
  get isValid() {
    return this.title && this.isTimeValid && this.isDateValid;
  }

  @action.bound
  setTitle(title: string) {
    this.title = title;
  }

  @action.bound
  setTime(time: string) {
    this.time = time;
  }

  @computed
  get isTimeValid() {
    return Boolean(this.time.match(/^\d\d:(00|30)$/));
  }

  @computed
  get isDateValid() {
    return Boolean(this.date.match(/^\d\d\d\d-\d\d-\d\d$/));
  }

  @computed
  get endTime() {
    const match = this.time.match(/^(\d\d):(\d\d)$/);
    if (!match) {
      return;
    }
    const hour = match[1];
    const minute = match[2];
    return String(parseInt(hour, 10) + 2).padStart(2, '0') + ':' + minute;
  }

  serialize() {
    if (!this.isValid) {
      return;
    }
    const endTime = this.endTime;
    if (!endTime) {
      return; // shouldn't happen, but this makes typescript happy
    }
    return {
      title: this.title,
      date: this.date,
      startTime: this.time,
      endTime,
    };
  }

  created() {
    this.show = false; // we don't need the modal anymore
    this.creating = false;
  }
}

export default class EventView implements View {
  name: string;
  root: RootStore;

  @observable eventId?: string;
  filter: EventFilter;

  @observable newEvent = new NewEventSubview();

  constructor(root: RootStore, props: EventViewProps) {
    this.root = root;
    this.name = 'Event';
    this.filter = new EventFilter(this.root.eventStore);

    this.update(props);
  }

  @action
  update(props: EventViewProps) {
    this.eventId = props.id;
    this.setFilterProps(props.filter || {});
  }

  @action.bound
  setFilterProps(queryObj: object) {
    this.filter.fromQuery(queryObj);
  }

  @computed
  get selectedEvent() {
    if (!this.eventId) {
      return;
    }
    return fromPromise(this.root.eventStore.getEvent(this.eventId));
  }

  @action.bound
  async createNewEvent() {
    const createParams = this.newEvent.serialize();
    if (!createParams) {
      return; // throw exception?
    }
    this.newEvent.creating = true;
    await this.root.eventStore.createEvent(createParams);
    runInAction(() => this.newEvent.created());
  }
}
