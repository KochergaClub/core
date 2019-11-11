import { action, computed } from 'mobx';

import { GoogleLoginResponse } from 'react-google-login';

import { API } from '~/common/api';

import { RootStore } from './RootStore';

export class ApiStore {
  wsServer: string =
    process.env.REACT_APP_API_WS_SERVER || 'wss://kocherga-club.ru/ws'; // FIXME

  rootStore: RootStore;

  api: API;

  constructor(rootStore: RootStore, api: API) {
    this.api = api;
    this.rootStore = rootStore;
  }

  getQueryString(params: { [s: string]: string | boolean }) {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k] as string))
      .join('&');
  }

  @computed
  get isSignedIn() {
    return true;
  }

  @action
  async auth(googleUser: GoogleLoginResponse) {}

  @action
  logout() {}

  async call(
    method: string,
    url: string,
    body: undefined | object = undefined,
    json = true
  ) {
    const result = await this.api.call(url, method, body, json);
    return result;
  }

  getWebsocket(path: string) {
    return new window.WebSocket(`${this.wsServer}/${path}`);
  }
}
