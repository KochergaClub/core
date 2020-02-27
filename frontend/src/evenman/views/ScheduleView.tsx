import { action } from 'mobx';

import { RootStore } from '../stores/RootStore';

import View from './View';

export default class ScheduleView implements View {
  name: string;
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    this.name = 'Schedule';
  }

  @action
  update() {
    return;
  }
}
