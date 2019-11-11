import { action, computed, observable, runInAction } from 'mobx';

import moment from 'moment';

import { ApiStore } from './ApiStore';

import EventShape from './EventShape';

export type EventAnnounceTarget = 'vk' | 'fb' | 'timepad';
export type EventImageType = 'default' | 'vk';
export type TemplaterMode = 'html' | 'png';
export type EventType = 'private' | 'public' | 'unknown';

// tslint:disable:variable-name

interface VkAnnouncement {
  link?: string;
  group?: string;
}

interface FbAnnouncement {
  link?: string;
  group?: string;
  added_to_main_page: boolean;
  shared_to_main_page: boolean;
}

interface TimepadAnnouncement {
  link?: string;
  prepaid_tickets: boolean;
  category_code?: string;
}

interface Announcements {
  vk: VkAnnouncement;
  fb: FbAnnouncement;
  timepad: TimepadAnnouncement;
}

export interface EventJSON {
  id: string;
  title: string;
  description?: string;
  summary?: string;
  type: EventType;
  location?: string;
  start: string;
  end: string;
  created: string;
  master_id?: string;
  is_master?: boolean;
  prototype_id?: number;
  project_slug?: string;
  timing_description_override?: string;
  images: { [key: string]: string }; // can't use key: EventImageType, unfortunately
  tags: string[];

  deleted: boolean;

  published?: boolean;

  visitors?: number;

  announcements: Announcements;
}

export class Event extends EventShape {
  @observable id: string;
  @observable type: EventType;

  @observable start: string;
  @observable end: string;

  @observable created: string;
  @observable master_id?: string;
  @observable is_master?: boolean;
  @observable prototype_id?: number;

  @observable published?: boolean;

  @observable visitors?: string;

  images = observable.map<string>();

  @observable deleted: boolean;

  @observable isLoading = false;

  @observable announcements: Announcements;

  constructor(apiStore: ApiStore, json: EventJSON) {
    super(apiStore);

    // set mandatory fields immediately
    this.id = json.id;
    this.type = json.type;
    this.title = json.title;

    this.start = json.start;
    this.end = json.end;

    this.created = json.created;
    this.deleted = json.deleted;

    this.announcements = json.announcements;

    // set remaining fields using the common code
    this.updateFromJSON(json);
  }

  static fromJSON(json: any, store: ApiStore): Event {
    const event = new Event(store, json);
    return event;
  }

  get idString() {
    return this.id;
  }

  get apiEntity() {
    return 'events';
  }

  getImage(key: EventImageType) {
    return this.images.get(key);
  }

  @computed
  get isAnnounced() {
    return (
      this.published &&
      this.announcements.fb.link &&
      this.announcements.vk.link &&
      this.announcements.timepad.link
    );
  }

  @computed
  get isPublished() {
    return this.published;
  }

  @computed
  get isPublic() {
    return this.type === 'public';
  }

  @computed
  get startMoment() {
    return moment(this.start);
  }

  @computed
  get endMoment() {
    return moment(this.end);
  }

  @computed
  get isPast() {
    return this.startMoment.isBefore(moment());
  }

  @action
  async _patch(patch: object) {
    this.isLoading = true;

    const updatedEvent = (await this.apiStore.call(
      'PATCH',
      `events/${this.id}`,
      patch
    )) as EventJSON;

    this.updateFromJSON(updatedEvent);

    runInAction(() => (this.isLoading = false));
  }

  @action
  private async _act(cb: () => Promise<void>, reload = true) {
    this.isLoading = true;
    await cb();

    if (reload) {
      await this.reload();
    }
    runInAction(() => (this.isLoading = false));
  }

  @action
  async delete() {
    await this._act(() => this.apiStore.call('DELETE', `events/${this.id}`));
  }

  setPublished(value: boolean) {
    return this._patch({ published: value });
  }

  async setPrototypeId(id: number) {
    return await this._patch({ prototype_id: id });
  }

  setStart(m: moment.Moment) {
    const format = 'YYYY-MM-DD HH:mm';
    const start = m.format(format);
    const end = moment(this.endMoment)
      .add(m.diff(this.startMoment, 'seconds'), 'seconds')
      .format(format);

    return this._patch({ start, end });
  }

  getAnnounceLink(target: EventAnnounceTarget) {
    switch (target) {
      case 'vk':
        return this.announcements.vk.link;
      case 'fb':
        return this.announcements.fb.link;
      case 'timepad':
        return this.announcements.timepad.link;
    }
  }

  @action
  async setAnnounceLink(target: EventAnnounceTarget, link: string) {
    return this._patch({
      announcements: {
        [target]: {
          link,
        },
      },
    });
  }

  @computed
  get readyForAnnounceToTimepad() {
    return (
      this.description && this.summary && this.title && this.getImage('default')
    );
  }

  @computed
  get readyForAnnounceToVk() {
    return (
      this.description &&
      this.title &&
      this.getImage('vk') &&
      this.announcements.vk.group
    );
  }

  @computed
  get readyForAnnounceToFb() {
    return this.description && this.title && this.getImage('default');
  }

  @action
  async announceToTimepad() {
    return this.announceTo('timepad');
  }

  @action
  async announceToVk() {
    return this.announceTo('vk');
  }

  @action
  async announceToFb() {
    return this.announceTo('fb');
  }

  @computed
  get readyForAnnounceToFbMainPage() {
    return (
      this.announcements.fb.link &&
      this.announcements.fb.group &&
      !this.announcements.fb.added_to_main_page
    );
  }

  @computed
  get readyForSharingToFbMainPage() {
    return (
      this.announcements.fb.link &&
      this.announcements.fb.group &&
      !this.announcements.fb.shared_to_main_page
    );
  }

  @action
  async announceToFbMainPage() {
    await this._act(() =>
      this.apiStore.call('POST', `announcements/fb/${this.id}/add_to_main_page`)
    );
  }

  @action
  async shareToFbMainPage() {
    await this._act(() =>
      this.apiStore.call(
        'POST',
        `announcements/fb/${this.id}/share_to_main_page`
      )
    );
  }

  @action
  async setImageFromUrl(url: string) {
    await this._act(() =>
      this.apiStore.call('POST', `events/${this.id}/image_from_url/default`, {
        url,
      })
    );
  }

  @action
  async uploadImage(file: Blob, imageType: string) {
    await this._act(async () => {
      const formData = new FormData();
      formData.append('file', file);

      await this.apiStore.call(
        'POST',
        `events/${this.id}/image/${imageType}`,
        formData,
        false
      );
    });
  }

  @action
  async setType(newType: EventType) {
    await this._patch({ type: newType });
  }

  @action
  async invertType() {
    const oppositeTypes: { [key in EventType]: EventType } = {
      public: 'private',
      private: 'public',
      unknown: 'unknown',
    };
    const newType = oppositeTypes[this.type];
    await this.setType(newType);
  }

  @action
  async reload() {
    // TODO - set 'isLoading' state - this function can be called not just from _patch

    const updatedEvent = (await this.apiStore.call(
      'GET',
      `events/${this.id}`
    )) as EventJSON;

    if (updatedEvent.id !== this.id) {
      throw new Error(
        `Server returned the invalid event, let's panic (${updatedEvent.id} != ${this.id})`
      );
    }

    this.updateFromJSON(updatedEvent);
  }

  @action
  updateFromJSON(json: EventJSON) {
    const fields = [
      'title',
      'description',
      'summary',
      'type',
      'location',
      'start',
      'end',
      'created',
      'master_id',
      'timing_description_override',
      'prototype_id',
      'project_slug',
      'published',
      'visitors',
      'deleted',
      'tags',
      'announcements',
    ];
    fields.forEach(field => {
      // @ts-ignore
      this[field] = json[field];
    });
    if (!this.is_master) {
      this.is_master = false;
    }

    this.images.replace(json.images || {});
  }

  vkImageTemplater(
    header: string | undefined,
    title: string | undefined,
    mode: TemplaterMode
  ) {
    const m = this.startMoment;
    const date = m.format('YYYY-MM-DD');
    const time = m.format('HH:mm');
    const image = this.getImage('default');
    const server = this.apiStore.server;
    return `${server}/templater/vk-image/${mode}?date=${date}&time=${time}&title=${title}&header=${header}&background_image=${image}`;
  }

  @action
  async vkImageGenerate(header: string, title: string) {
    const response = await fetch(this.vkImageTemplater(header, title, 'png'));
    if (!response.ok) {
      throw new Error("can't fetch image");
    }
    const blob = await response.blob();

    await this.uploadImage(blob, 'vk');
  }

  @action
  private async announceTo(target: EventAnnounceTarget, body = {}) {
    await this._act(() =>
      this.apiStore.call(
        'POST',
        `announcements/${target}/event/${this.id}`,
        body
      )
    );
  }

  // FIXME - the following 4 methods use deprecated fields for patching
  @action
  setTimepadPrepaidTickets(prepaid: boolean) {
    this._patch({ announcements: { timepad: { prepaid_tickets: prepaid } } });
  }

  @action
  setTimepadCategoryCode(code: string) {
    this._patch({ announcements: { timepad: { category_code: code } } });
  }

  @action
  async setVkGroup(value: string | null) {
    this._patch({ announcements: { vk: { group: value } } });
  }

  @action
  async setFbGroup(value: string | null) {
    this._patch({ announcements: { fb: { group: value } } });
  }

  @computed
  get getVkGroup() {
    return this.announcements.vk.group;
  }

  @computed
  get getFbGroup() {
    return this.announcements.fb.group;
  }

  @computed
  get getTimepadCategoryCode() {
    return this.announcements.timepad.category_code;
  }

  @computed
  get getTimepadPrepaidTickets() {
    return this.announcements.timepad.prepaid_tickets;
  }
}
