import { action, computed, observable, when } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';

import { ApiStore } from './ApiStore';

export interface TimepadCategory {
  id: number;
  code: string;
  name: string;
}

export type AnnouncementCommand =
  | 'updateVkWikiSchedule'
  | 'createVkSchedulePost'
  | 'postTelegramSchedule'
  | 'postEmailDigest';

const COMMANDS: { [k in AnnouncementCommand]: string } = {
  updateVkWikiSchedule: 'announcements/vk/update_wiki_schedule',
  createVkSchedulePost: 'weekly-digest/current/vk',
  postTelegramSchedule: 'weekly-digest/current/telegram',
  postEmailDigest: 'weekly-digest/current/mailchimp-draft',
};

export class AnnouncementToolsStore {
  apiStore: ApiStore;

  @observable loading: { [k in AnnouncementCommand]?: boolean } = {};

  constructor(apiStore: ApiStore) {
    this.apiStore = apiStore;

    when(
      () => apiStore.isSignedIn,
      () => this.timepadCategories // prefetch
    );
  }

  @computed
  get timepadCategories(): IPromiseBasedObservable<TimepadCategory[]> {
    if (!this.apiStore.isSignedIn) {
      return fromPromise(new Promise(resolve => resolve([])));
    }
    return fromPromise(
      this.apiStore
        .call('GET', 'announcements/timepad/categories')
        .then(json => {
          return json as TimepadCategory[];
        })
    );
  }

  @computed
  get fbGroups(): IPromiseBasedObservable<string[]> {
    return fromPromise(
      this.apiStore.call('GET', 'announcements/fb/groups').then(json => {
        return json as string[];
      })
    );
  }

  @computed
  get vkGroups(): IPromiseBasedObservable<string[]> {
    return fromPromise(
      this.apiStore.call('GET', 'announcements/vk/groups').then(json => {
        return json as string[];
      })
    );
  }

  @computed
  get projectSlugs(): IPromiseBasedObservable<string[]> {
    return fromPromise(
      this.apiStore
        .call(
          'GET',
          'wagtail/pages/?type=projects.ProjectPage&fields=is_active&limit=100'
        )
        .then(json => json.items.map((item: any) => item.meta.slug as string))
    );
  }

  @action
  async performCommand(command: AnnouncementCommand) {
    this.startCommand(command);
    await this.apiStore.call('POST', COMMANDS[command], {});
    this.stopCommand(command);
  }

  @action
  async postEmailDigest(text: string) {
    this.startCommand('postEmailDigest');
    await this.apiStore.call('POST', COMMANDS.postEmailDigest, { text });
    this.stopCommand('postEmailDigest');
  }

  @action
  private startCommand(command: AnnouncementCommand) {
    this.loading[command] = true;
  }

  @action
  private stopCommand(command: AnnouncementCommand) {
    this.loading[command] = false;
  }
}
