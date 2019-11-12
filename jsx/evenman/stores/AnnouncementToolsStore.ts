import { action, computed, observable } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';

import { API } from '~/common/api';

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
  api: API;

  @observable loading: { [k in AnnouncementCommand]?: boolean } = {};

  constructor(api: API) {
    this.api = api;
  }

  @computed
  get timepadCategories(): IPromiseBasedObservable<TimepadCategory[]> {
    return fromPromise(
      this.api.call('announcements/timepad/categories', 'GET').then(json => {
        return json as TimepadCategory[];
      })
    );
  }

  @computed
  get fbGroups(): IPromiseBasedObservable<string[]> {
    return fromPromise(
      this.api.call('announcements/fb/groups', 'GET').then(json => {
        return json as string[];
      })
    );
  }

  @computed
  get vkGroups(): IPromiseBasedObservable<string[]> {
    return fromPromise(
      this.api.call('announcements/vk/groups', 'GET').then(json => {
        return json as string[];
      })
    );
  }

  @computed
  get projectSlugs(): IPromiseBasedObservable<string[]> {
    return fromPromise(
      this.api
        .call(
          'wagtail/pages/?type=projects.ProjectPage&fields=is_active&limit=100',
          'GET'
        )
        .then(json => json.items.map((item: any) => item.meta.slug as string))
    );
  }

  @action
  async performCommand(command: AnnouncementCommand) {
    this.startCommand(command);
    await this.api.call(COMMANDS[command], 'POST', {});
    this.stopCommand(command);
  }

  @action
  async postEmailDigest(text: string) {
    this.startCommand('postEmailDigest');
    await this.api.call(COMMANDS.postEmailDigest, 'POST', { text });
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
