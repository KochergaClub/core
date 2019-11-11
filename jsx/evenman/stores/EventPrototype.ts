import { action, observable, runInAction, computed } from 'mobx';

import moment from 'moment';

import { ApiStore } from './ApiStore';

import { Event, EventJSON } from './Event';

import EventShape from './EventShape';

// for creating new prototypes which have no id or instances yet
export interface NewEventPrototypeJSON {
  title: string;
  location: string;
  summary?: string;
  description?: string;
  timepad_category_code?: string;
  timepad_prepaid_tickets: boolean;
  timing_description_override?: string;
  project_slug?: string;
  weekday: number;
  hour: number;
  minute: number;
  length: number;
  active: boolean;
}

export interface EventPrototypeJSON extends NewEventPrototypeJSON {
  prototype_id: number;

  instances: EventJSON[];
  suggested: string[];
}

class PrototypeInstances {
  @observable items: Event[] = [];
  @observable state: 'not_loaded' | 'loading' | 'loaded' = 'not_loaded';
  apiStore: ApiStore;
  prototype_id: number;

  constructor(prototype_id: number, store: ApiStore) {
    this.apiStore = store;
    this.prototype_id = prototype_id;
  }

  async load() {
    this.state = 'loading';

    // TODO - store events in EventStore by id
    const json = (await this.apiStore.call(
      'GET',
      `event_prototypes/${this.prototype_id}/instances`
    )) as EventJSON[];
    this.items = json.map(j => Event.fromJSON(j, this.apiStore));

    runInAction(() => (this.state = 'loaded'));
  }
}

export default class EventPrototype extends EventShape {
  @observable id: number;
  @observable weekday: number;
  @observable hour: number;
  @observable minute: number;
  @observable length: number;
  @observable active: boolean;

  @observable image?: string;

  @observable instances: PrototypeInstances;
  @observable suggested: moment.Moment[] = [];

  @observable vk_group?: string;
  @observable fb_group?: string;

  @observable timepad_category_code?: string;
  @observable timepad_prepaid_tickets: boolean;

  @observable state: string = 'normal';

  constructor(apiStore: ApiStore, json: EventPrototypeJSON) {
    super(apiStore);

    // set mandatory fields immediately - needed for typescript (but this is messy and we should figure out a better way)
    this.id = json.prototype_id;
    this.weekday = json.weekday;
    this.hour = json.hour;
    this.minute = json.minute;
    this.length = json.length;
    this.active = json.active;
    this.timepad_prepaid_tickets = json.timepad_prepaid_tickets;
    this.instances = new PrototypeInstances(this.id, apiStore);

    // set remaining fields using the common code
    this.updateFromJSON(json);
  }

  static fromJSON(json: EventPrototypeJSON, store: ApiStore): EventPrototype {
    const prototype = new EventPrototype(store, json);
    return prototype;
  }

  get idString() {
    return String(this.id);
  }

  get apiEntity() {
    return 'event_prototypes';
  }

  @action
  updateFromJSON(json: EventPrototypeJSON) {
    this.id = json.prototype_id;
    for (const key of [
      'title',
      'location',
      'summary',
      'description',
      'weekday',
      'hour',
      'minute',
      'length',
      'active',
      'image',
      'timepad_category_code',
      'timepad_prepaid_tickets',
      'timing_description_override',
      'project_slug',
      'vk_group',
      'fb_group',
      'tags',
    ]) {
      // @ts-ignore
      this[key] = json[key];
    }

    this.suggested = json.suggested.map(d => moment(d));
  }

  @action
  async reload() {
    const updated = (await this.apiStore.call(
      'GET',
      `event_prototypes/${this.id}`
    )) as EventPrototypeJSON;

    if (updated.prototype_id.toString() !== this.id.toString()) {
      throw new Error(
        `Server returned an invalid event prototype, let's panic (${updated.prototype_id} != ${this.id})`
      );
    }

    this.updateFromJSON(updated);
  }

  @action
  async newEvent(m: moment.Moment) {
    this.state = 'creating';
    await this.apiStore.call('POST', `event_prototypes/${this.id}/new`, {
      ts: m.unix(),
    });
    await this.reload();
    runInAction(() => (this.state = 'normal'));
  }

  @action
  async cancelDate(m: moment.Moment) {
    this.state = 'canceling_date';
    await this.apiStore.call(
      'POST',
      `event_prototypes/${this.id}/cancel_date/${m.format('YYYY-MM-DD')}`
    );
    await this.reload();
    runInAction(() => (this.state = 'normal'));
  }

  @action
  async _patch(patch: object) {
    this.state = 'saving';

    await this.apiStore.call('PATCH', `event_prototypes/${this.id}`, patch);

    await this.reload();
    runInAction(() => (this.state = 'normal'));
  }

  @action
  async setActive(active: boolean) {
    await this._patch({ active });
  }

  @computed
  get upcomingCount() {
    const upTo = moment().add(7, 'day');
    return this.suggested.filter(m => m.isSameOrBefore(upTo)).length;
  }

  @action
  async uploadImage(file: Blob) {
    this.state = 'saving';

    const formData = new FormData();
    formData.append('file', file);

    await this.apiStore.call(
      'POST',
      `event_prototypes/${this.id}/image`,
      formData,
      false
    );

    await this.reload();
    runInAction(() => (this.state = 'normal'));
  }

  @action
  setTimepadPrepaidTickets(prepaid: boolean) {
    return this._patch({ timepad_prepaid_tickets: prepaid });
  }

  @action
  setTimepadCategoryCode(code: string) {
    return this._patch({ timepad_category_code: code });
  }

  @action
  async setVkGroup(value: string | null) {
    this._patch({ vk_group: value });
  }

  @action
  async setFbGroup(value: string | null) {
    this._patch({ fb_group: value });
  }

  // these 4 methods are used for API consistency with Event.ts
  @computed
  get getVkGroup() {
    return this.vk_group;
  }

  @computed
  get getFbGroup() {
    return this.fb_group;
  }

  @computed
  get getTimepadCategoryCode() {
    return this.timepad_category_code;
  }

  @computed
  get getTimepadPrepaidTickets() {
    return this.timepad_prepaid_tickets;
  }
}
