import { action, observable } from 'mobx';

import moment from 'moment';

import { Event, EventJSON } from './Event';

import { ApiStore } from './ApiStore';

export class EventStore {
  @observable events = observable.map<string, Event>();

  apiStore: ApiStore;

  constructor(apiStore: ApiStore) {
    this.apiStore = apiStore;
  }

  findEvent(id: string): Event | undefined {
    return this.events.get(id);
  }

  async getEvent(id: string) {
    let event = this.findEvent(id);
    if (event) return event;

    event = Event.fromJSON({ id }, this.apiStore);
    await event.reload();
    return event;
  }

  @action
  async addEventsFromJSON(jsons: EventJSON[]) {
    for (const json of jsons) {
      const event = this.findEvent(json.id);
      if (event) {
        event.updateFromJSON(json);
      } else {
        this.events.set(json.id, Event.fromJSON(json, this.apiStore));
      }
    }
  }

  @action
  async updateRange(startDate: moment.Moment, endDate: moment.Moment) {
    const query = this.apiStore.getQueryString({
      from_date: startDate.format('YYYY-MM-DD'),
      to_date: endDate.format('YYYY-MM-DD'),
    });

    const json = (await this.apiStore.call(
      'GET',
      `events?${query}`
    )) as EventJSON[];
    this.addEventsFromJSON(json);
    // TODO - remove stale events
  }

  @action
  async createEvent(params: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
  }) {
    const json = (await this.apiStore.call(
      'POST',
      'events',
      params
    )) as EventJSON;
    this.addEventsFromJSON([json]);
  }
}
