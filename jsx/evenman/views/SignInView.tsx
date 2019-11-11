import { action } from 'mobx';

import { RootStore } from '../stores/RootStore';

import View from './View';

export default class SignInView implements View {
  name: string;
  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    this.name = "SignIn";
  }

  @action
  update(props: {}) {
    return;
  }

  get toPath() {
    return '/';
  }
}
