import DataLoader from 'dataloader';

import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

type Query = {
  [s: string]: string | boolean | number | undefined | null;
};

const buildQueryString = (params: Query) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null)
    .map(k => esc(k) + '=' + esc(params[k] as string))
    .join('&');
};

export class KochergaAPI extends RESTDataSource {
  private loaders: { [k: string]: DataLoader<string, any> } = {};

  constructor(host: string) {
    super();
    this.baseURL = 'http://' + host + '/api';
  }

  willSendRequest(request: RequestOptions) {
    if (this.context.cookie) {
      request.headers.set('Cookie', this.context.cookie);
    }
    if (this.context.csrfToken) {
      request.headers.set('X-CSRFToken', this.context.csrfToken);
    }
  }

  // generic methods
  async list({ resource, query }: { resource: string; query?: Query }) {
    let url = resource;
    if (query) {
      url += '?' + buildQueryString(query);
    }
    return await this.get(url);
  }

  async listPage({
    resource,
    query,
    page,
    page_size,
  }: {
    resource: string;
    query?: Query;
    page?: number | null;
    page_size?: number | null;
  }) {
    let url = resource;
    if (query || page || page_size) {
      url += '?' + buildQueryString({ ...(query || {}), page, page_size });
    }

    interface DRFPaginatedResponse {
      count: number;
      next: string | null;
      previous: string | null;
      results: any[];
    }

    const response = (await this.get(url)) as DRFPaginatedResponse;

    return {
      pageInfo: {
        hasNextPage: Boolean(response.next),
        pageNumber: page || 1,
      },
      nodes: response.results,
    };
  }

  async retrieve({ resource, id }: { resource: string; id: string }) {
    const response = await this.get(`${resource}/${id}`);
    return response;
  }

  async retrieveSingleton({ resource }: { resource: string }) {
    const response = await this.get(resource);
    return response;
  }

  async create({ resource, params }: { resource: string; params: object }) {
    const response = await this.post(resource, params);
    return response;
  }

  async update({
    resource,
    id,
    patch,
  }: {
    resource: string;
    id: string;
    patch: object;
  }) {
    const response = await this.patch(`${resource}/${id}`, patch);
    return response;
  }

  async postResourceAction({
    resource,
    action,
    params,
  }: {
    resource: string;
    action: string;
    params?: object;
  }) {
    const response = await this.post(`${resource}/${action}`, params);
    return response;
  }

  async postDetailsAction({
    resource,
    id,
    action,
    params,
  }: {
    resource: string;
    id: string;
    action: string;
    params?: object;
  }) {
    const response = await this.post(`${resource}/${id}/${action}`, params);
    return response;
  }

  loader({ resource, paged }: { resource: string; paged: boolean }) {
    if (!this.loaders[resource]) {
      this.loaders[resource] = new DataLoader(
        async ids => {
          const response = await this.get(
            `${resource}/bulk?ids=${ids.join(',')}`
          );
          const results = paged ? response.results : response;
          const resultsObj: { [k: string]: any } = {};
          for (const result of results) {
            resultsObj[result.id] = result;
          }

          return ids.map(
            id => resultsObj[id] || new Error(`No result for ${id}`)
          );
        },
        { maxBatchSize: 100 }
      );
    }
    return this.loaders[resource];
  }
}
