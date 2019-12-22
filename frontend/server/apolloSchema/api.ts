import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

type Query = {
  [s: string]: string | boolean | number | undefined;
};

const buildQueryString = (params: Query) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .filter(k => params[k] !== undefined)
    .map(k => esc(k) + '=' + esc(params[k] as string))
    .join('&');
};

export class KochergaAPI extends RESTDataSource {
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
  }: {
    resource: string;
    query?: Query;
    page?: number;
  }) {
    let url = resource;
    if (query) {
      url += '?' + buildQueryString({ ...query, page });
    }

    interface DRFPaginatedResponse {
      count: number;
      next: string | null;
      previous: string | null;
      results: {
        id: number;
      }[];
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

  async create({ resource, params }: { resource: string; params: object }) {
    const response = await this.post(resource, params);
    return response;
  }

  async postAction({
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
}
