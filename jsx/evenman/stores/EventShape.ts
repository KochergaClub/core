import { action, observable, runInAction } from 'mobx';

import { RootStore } from './RootStore';

// tslint:disable:variable-name

// both Event and EventPrototype extend this
export default abstract class EventShape {
  // This initialization bad. But we can't init title meaningfully in constructor() and don't want to pass title in args separately.
  @observable title: string = '';

  @observable location?: string;
  @observable summary?: string;
  @observable description?: string;
  @observable timing_description_override?: string;
  @observable project_slug?: string;

  @observable tags: string[] = [];

  @observable inTransaction: boolean = false;

  root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  abstract async _patch(patch: object): Promise<void>;

  abstract get idString(): string;

  abstract get getFbGroup(): string | undefined;
  abstract get getVkGroup(): string | undefined;
  abstract get getTimepadPrepaidTickets(): boolean;
  abstract get getTimepadCategoryCode(): string | undefined;

  abstract setFbGroup(value: string | null): void;
  abstract setVkGroup(value: string | null): void;
  abstract setTimepadPrepaidTickets(prepaid: boolean): void;
  abstract setTimepadCategoryCode(code: string): void;

  @action
  async setTitle(title: string) {
    await this._patch({ title });
  }

  @action
  async setLocation(location: string) {
    await this._patch({ location });
  }

  @action
  async setSummary(summary: string) {
    await this._patch({ summary });
  }

  @action
  async setDescription(description: string) {
    await this._patch({ description });
  }

  @action
  async setVisitors(visitors: string) {
    await this._patch({ visitors });
  }

  @action
  async setTimingDescriptionOverride(value: string) {
    await this._patch({ timing_description_override: value });
  }

  @action
  async setProjectSlug(slug: string) {
    return await this._patch({ project_slug: slug });
  }

  abstract get apiEntity(): string;

  @action
  async addTag(value: string) {
    this._transaction(async () => {
      await this.root.api.call(
        `${this.apiEntity}/${this.idString}/tag/${value}`,
        'POST'
      );
      runInAction(() => {
        this.tags.push(value);
      });
    });
  }

  @action
  async deleteTag(value: string) {
    this._transaction(async () => {
      await this.root.api.call(
        `${this.apiEntity}/${this.idString}/tag/${value}`,
        'DELETE'
      );
      runInAction(() => {
        this.tags = this.tags.filter(v => v !== value);
      });
    });
  }

  protected async _transaction(code: () => Promise<void>) {
    this.inTransaction = true;
    await code();
    this.inTransaction = false;
  }
}
