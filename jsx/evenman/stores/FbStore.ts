import { action, observable } from 'mobx';

import { IS_SERVER } from '~/common/utils';

import { ApiStore } from './ApiStore';

declare global {
  interface Window {
    FB: {
      init: (args: any) => any;
      getLoginStatus: (response: any, flag: boolean) => any;
      login: (args: any) => any;
    };
  }
}

export class FbStore {
  apiStore: ApiStore;

  appId = '1685764725047458';

  @observable status: string = 'starting';

  constructor(apiStore: ApiStore) {
    this.apiStore = apiStore;

    if (IS_SERVER) {
      return;
    }

    ((d, s, id) => {
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = '//connect.facebook.net/ru_RU/sdk/debug.js';
      d.body.appendChild(js);
    })(document, 'script', 'facebook-jssdk');

    (window as any).fbAsyncInit = () => {
      window.FB.init({
        appId: this.appId,
        version: 'v2.12',
      });
      window.FB.getLoginStatus((response: any) => this.auth(response), true);
    };
  }

  @action
  login() {
    this.status = 'connecting';
    window.FB.login((response: any) => this.auth(response));
  }

  @action
  logout() {
    this.status = 'connecting';
    window.FB.login((response: any) => this.auth(response));
  }

  @action
  async saveToken(token: string) {
    await this.apiStore.call('POST', 'fb/token', { access_token: token });
  }

  @action
  auth(response: any) {
    this.status = response.status; // 'connected', 'not_authorized' or 'unknown'
  }
}
