import { action } from 'mobx';

import { RootStore } from '../stores/RootStore';

import View from './View';

export default class TemplaterView implements View {
  name: string;
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    this.name = "Templater";
  }

  @action
  update(props: {}) {
    return;
  }

  get toPath() {
    return '/templater';
  }

  get list() {
    return this.root.templaterStore.list;
  }
}
