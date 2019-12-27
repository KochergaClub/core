import * as mobx from 'mobx';
const { action, autorun, computed, observable } = mobx;

import { createTransformer } from 'mobx-utils';

import moment from 'moment';

import { Event, EventType } from './Event';
import { EventStore } from './EventStore';

interface Query {
  hideAnnounced: boolean;
  hideUnpublished: boolean;
  type: EventType | 'all';
  date?: string;
}

const DEFAULTS: Query = {
  hideAnnounced: false,
  hideUnpublished: false,
  type: 'public',
};

export class EventFilter {
  @observable hideAnnounced = DEFAULTS.hideAnnounced;
  @observable hideUnpublished = DEFAULTS.hideUnpublished;
  @observable type = DEFAULTS.type;
  @observable customDate?: moment.Moment;
  @observable weeks = 3;

  eventStore: EventStore;

  public eventsByDate = createTransformer((date: moment.Moment) => {
    const key = date.format('YYYY-MM-DD');
    if (!this.date2events[key]) {
      this.date2events[key] = mobx.observable([]);
    }
    return this.date2events[key];
  });

  constructor(eventStore: EventStore) {
    this.eventStore = eventStore;

    autorun(() => {
      this.eventStore.updateRange(this.startDate, this.endDate);
    });
  }

  @computed
  get date2events() {
    const result: { [key: string]: mobx.IObservableArray<Event> } = {};

    for (
      const m = moment(this.startDate);
      m.isBefore(this.endDate);
      m.add(1, 'days')
    ) {
      const key = m.format('YYYY-MM-DD');
      result[key] = mobx.observable([]);
    }

    this.events.forEach(event => {
      const key = moment(event.startMoment)
        .startOf('day')
        .format('YYYY-MM-DD');
      if (!(key in result)) {
        result[key] = mobx.observable([]);
      }
      result[key].push(event);
    });
    return result;
  }

  @computed
  get startDate() {
    return moment(this.customDate).startOf('week');
  }

  @computed
  get endDate() {
    return moment(this.customDate)
      .add(this.weeks - 1, 'week')
      .endOf('week');
  }

  @action
  setDate(date: moment.Moment) {
    this.customDate = date;
  }

  @action
  setType(value: EventType | 'all') {
    this.type = value;
  }

  @action
  setHideAnnounced(value: boolean) {
    this.hideAnnounced = value;
  }

  @action
  setHideUnpublished(value: boolean) {
    this.hideUnpublished = value;
  }

  @computed
  get api() {
    return this.eventStore.root.api;
  }

  @computed
  get asQuery() {
    const query: Query = {
      type: this.type,
      hideAnnounced: this.hideAnnounced,
      hideUnpublished: this.hideUnpublished,
    };

    for (const key of Object.keys(query) as (keyof Query)[]) {
      if (DEFAULTS[key] === query[key]) {
        delete query[key];
      }
    }

    if (this.customDate) {
      query.date = this.customDate.format('YYYY-MM-DD');
    }

    return query;
  }

  @action
  fromQuery(query: any) {
    for (const key of Object.keys(query) as (keyof Query)[]) {
      // FIXME - replace this mess with this.query object
      // @ts-ignore
      this[key] = key in query ? query[key] : DEFAULTS[key];
    }

    if (query.date) {
      this.setDate(moment(query.date));
    }
  }

  @computed
  get allEventsInRange() {
    return mobx
      .values(this.eventStore.events)
      .filter(
        event =>
          event.startMoment.isSameOrAfter(this.startDate) &&
          event.startMoment.isSameOrBefore(this.endDate)
      )
      .sort((e1, e2) => e1.startMoment.valueOf() - e2.startMoment.valueOf());
  }

  @computed
  get unknownEvents() {
    return this.allEventsInRange.filter(event => event.type === 'unknown');
  }

  // TODO - unused by itself, move filter to date2events code
  @computed
  get events() {
    return this.allEventsInRange.filter(this.filterEvent);
  }

  private filterEvent = (event: Event) => {
    return (
      (this.type === 'all' ||
        event.type === this.type ||
        event.type === 'unknown') &&
      (!this.hideAnnounced || !event.isAnnounced) &&
      (!this.hideUnpublished || event.published)
    );
  };
}
