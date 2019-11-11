import { action, computed, observable, runInAction } from 'mobx';

import { ApiStore } from './ApiStore';

import EventPrototype, { NewEventPrototypeJSON } from './EventPrototype';

export default class EventPrototypeStore {
  apiStore: ApiStore;

  @observable eventPrototypes = observable.map<number, EventPrototype>();
  @observable state: string = "empty";
  @observable creating: boolean = false;

  @computed
  get list(): EventPrototype[] {
    const result = Array.from(this.eventPrototypes.values());
    return result;
  }

  constructor(apiStore: ApiStore) {
    this.apiStore = apiStore;
  }

  getById(id: number) {
    return this.eventPrototypes.get(id);
  }

  @action
  async loadAll() {
    this.state = "fetching";
    const json = await this.apiStore.call('GET', 'event_prototypes');

    runInAction(() => {
      for (const item of json) {
        const prototype = EventPrototype.fromJSON(item, this.apiStore);
        this.eventPrototypes.set(prototype.id, prototype);
      }
      this.state = "full";
    });
  }

  @action
  async create(params: NewEventPrototypeJSON) {
    this.creating = true;
    await this.apiStore.call('POST', 'event_prototypes', params);
    await this.loadAll();
    runInAction(() => this.creating = false);
  }
}
