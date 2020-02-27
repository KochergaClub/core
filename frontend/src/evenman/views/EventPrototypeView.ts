import { action, computed, observable } from 'mobx';

import { RootStore } from '../stores/RootStore';
import View from './View';

export interface EventPrototypeViewProps {
  id?: number;
}

export default class EventPrototypeView implements View {
  name: string;
  root: RootStore;

  @observable eventPrototypeId?: number;

  constructor(root: RootStore, props: EventPrototypeViewProps) {
    this.root = root;
    this.name = 'EventPrototype';
    this.update(props);
  }

  @computed
  get store() {
    return this.root.eventPrototypeStore;
  }

  @action
  update(props: EventPrototypeViewProps) {
    this.eventPrototypeId = props.id;
  }

  @action.bound
  selectEventPrototype(id: number) {
    this.eventPrototypeId = id;
  }

  @computed
  get selectedEventPrototype() {
    if (!this.eventPrototypeId) {
      return;
    }
    if (this.store.state === 'empty') {
      this.store.loadAll();
    }
    const result = this.store.getById(this.eventPrototypeId);
    return result;
  }
}
