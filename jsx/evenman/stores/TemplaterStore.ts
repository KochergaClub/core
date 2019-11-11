import { action, computed, observable, runInAction } from 'mobx';

import { ApiStore } from './ApiStore';

import ImageTemplate from './ImageTemplate';

export default class TemplaterStore {
  apiStore: ApiStore;

  @observable imageTemplates = observable.map<string, ImageTemplate>();
  @observable state: string = "empty";

  @computed
  get list(): ImageTemplate[] {
    if (this.state === "empty") {
      this.loadAll(); // lazy loading
    }

    const result = Array.from(this.imageTemplates.values());
    return result;
  }

  constructor(apiStore: ApiStore) {
    this.apiStore = apiStore;
  }

  getByName(name: string) {
    return this.imageTemplates.get(name);
  }

  @action
  async loadAll() {
    this.state = "fetching";
    const json = await this.apiStore.call('GET', 'templater');

    runInAction(() => {
      for (const item of json) {
        const template = new ImageTemplate(this.apiStore, item);
        this.imageTemplates.set(template.name, template);
      }
      this.state = "full";
    });
  }
}
