import { action, computed } from 'mobx';

import { GoogleLoginResponse } from 'react-google-login';

import { RootStore } from './RootStore';

export class ApiStore {
  server: string =
    process.env.REACT_APP_API_SERVER || 'https://kocherga-club.ru/api';
  wsServer: string =
    process.env.REACT_APP_API_WS_SERVER || 'wss://kocherga-club.ru/ws';

  rootStore: RootStore;

  constructor(rootStore: RootStore, server?: string) {
    if (server) {
      this.server = server;
    }

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

  async checkResponse(response: Response) {
    if (response.status < 400) {
      return;
    }
    this.checkAuth();

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.startsWith('application/json')) {
      const body = await response.text();
      this.rootStore.addError(`Error: ${body}`);
    }
    this.rootStore.addError('Bad server response');
  }

  headers(h: { [key: string]: string }) {
    return {
      ...h,
    };
  }

  @action
  async auth(googleUser: GoogleLoginResponse) {}

  @action
  setTokenAndEmail(token: string, email: string) {}

  async checkAuth() {}

  @action
  logout() {}

  async call(method: string, url: string, body = {}, json = true) {
    const options: {
      method: string;
      headers?: { [key: string]: string };
      body?: any;
    } = {
      method,
    };

    options.headers = json
      ? this.headers({ 'Content-Type': 'application/json' })
      : this.headers({});

    if (Object.keys(body).length || 'entries' in body) {
      // tslint:disable-line
      options.body = json ? JSON.stringify(body) : body; // pass as-is in case of urlencoded forms or something
    }

    const response = await fetch(`${this.server}/${url}`, options);
    await this.checkResponse(response);

    const result = await response.json();
    return result;
  }

  getWebsocket(path: string) {
    return new window.WebSocket(`${this.wsServer}/${path}`);
  }
}
