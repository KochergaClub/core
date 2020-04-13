import { action, observable } from 'mobx';

import moment from 'moment';

import { buildQueryString } from '~/common/utils';

import { Event, EventJSON } from './Event';

import { RootStore } from './RootStore';

export class EventStore {
  @observable events = observable.map<string, Event>();

  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  findEvent(id: string): Event | undefined {
    return this.events.get(id);
  }

  async getEvent(id: string) {
    let event = this.findEvent(id);
    if (event) {
      return event;
    }

    event = Event.fromJSON({ id }, this.root);
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
        this.events.set(json.id, Event.fromJSON(json, this.root));
      }
    }
  }

  @action
  async updateRange(startDate: moment.Moment, endDate: moment.Moment) {
    const query = buildQueryString({
      from_date: startDate.format('YYYY-MM-DD'),
      to_date: endDate.format('YYYY-MM-DD'),
    });

    const json = (await this.root.api.call(
      `events?${query}`,
      'GET'
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
    const json = (await this.root.api.call(
      'events',
      'POST',
      params
    )) as EventJSON;
    this.addEventsFromJSON([json]);
  }
}
