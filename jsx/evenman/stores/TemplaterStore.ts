import { action, computed, observable, runInAction } from 'mobx';

import { API } from '~/common/api';

import ImageTemplate from './ImageTemplate';

export default class TemplaterStore {
  api: API;

  @observable imageTemplates = observable.map<string, ImageTemplate>();
  @observable state: string = 'empty';

  @computed
  get list(): ImageTemplate[] {
    if (this.state === 'empty') {
      this.loadAll(); // lazy loading
    }

    const result = Array.from(this.imageTemplates.values());
    return result;
  }

  constructor(api: API) {
    this.api = api;
  }

  getByName(name: string) {
    return this.imageTemplates.get(name);
  }

  @action
  async loadAll() {
    this.state = 'fetching';
    const json = await this.api.call('templater', 'GET');

    runInAction(() => {
      for (const item of json) {
        const template = new ImageTemplate(item);
        this.imageTemplates.set(template.name, template);
      }
      this.state = 'full';
    });
  }
}
