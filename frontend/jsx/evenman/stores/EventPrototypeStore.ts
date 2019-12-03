import { action, computed, observable, runInAction } from 'mobx';

import { RootStore } from './RootStore';

import EventPrototype, { NewEventPrototypeJSON } from './EventPrototype';

export default class EventPrototypeStore {
  root: RootStore;

  @observable eventPrototypes = observable.map<number, EventPrototype>();
  @observable state: string = 'empty';
  @observable creating: boolean = false;

  @computed
  get list(): EventPrototype[] {
    const result = Array.from(this.eventPrototypes.values());
    return result;
  }

  constructor(root: RootStore) {
    this.root = root;
  }

  getById(id: number) {
    return this.eventPrototypes.get(id);
  }

  @action
  async loadAll() {
    this.state = 'fetching';
    const json = await this.root.api.call('event_prototypes', 'GET');

    runInAction(() => {
      for (const item of json) {
        const prototype = EventPrototype.fromJSON(item, this.root);
        this.eventPrototypes.set(prototype.id, prototype);
      }
      this.state = 'full';
    });
  }

  @action
  async create(params: NewEventPrototypeJSON) {
    this.creating = true;
    await this.root.api.call('event_prototypes', 'POST', params);
    await this.loadAll();
    runInAction(() => (this.creating = false));
  }
}
