import { IS_SERVER } from './utils';

declare global {
  interface Window {
    WebSocket: {
      new (url: string): WebSocket;
    };
  }
}

export class APIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    // not sure what this code does, see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export interface APIProps {
  csrfToken: string;
  base?: string;
  cookie?: string;
  realHost?: string;
}

export interface APICallOptions {
  expectJSON?: boolean;
  stringifyPayload?: boolean;
}

export class API {
  csrfToken: string;
  base: string;
  cookie: string;
  realHost: string;

  constructor(props: APIProps) {
    this.csrfToken = props.csrfToken || '';
    this.base = props.base || '';
    this.cookie = props.cookie || '';
    this.realHost = props.realHost || '';
  }

  getHeaders = (): { [header: string]: string } => {
    const headers: { [header: string]: string } = {
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken,
    };
    if (this.cookie) {
      headers['Cookie'] = this.cookie;
    }
    if (this.realHost) {
      headers['X-Forwarded-Host'] = this.realHost;
    }
    return headers;
  };

  call = async (
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
    payload?: object,
    options: APICallOptions = {}
  ) => {
    const headers = this.getHeaders();

    const defaultOptions: APICallOptions = {
      expectJSON: true,
      stringifyPayload: true,
    };

    const mergedOptions: APICallOptions = {
      ...defaultOptions,
      ...options,
    };

    const params: RequestInit = {
      method,
      headers,
    };
    if (payload) {
      if (mergedOptions.stringifyPayload) {
        params.body = JSON.stringify(payload);
      } else {
        params.body = payload as any;
        delete headers['Content-Type']; // FIXME - move this logic to getHeaders
      }
    }

    const startStamp = Date.now();
    const response = await fetch(`${this.base}/api/${path}`, params);
    if (IS_SERVER) {
      const time = (Date.now() - startStamp) / 1000;
      console.log(`${time} - got response for ${path}`);
    }

    if (!response.ok) {
      const responseBody = await response.text();

      const error = `Error ${response.status}: ${JSON.stringify(responseBody)}`;
      if (!IS_SERVER) {
        window.alert(error);
      }
      throw new APIError(error, response.status);
    }

    if (mergedOptions.expectJSON) {
      return await response.json();
    } else {
      return response;
    }
  };

  callDelete = async (path: string) => {
    return await this.call(path, 'DELETE', undefined, { expectJSON: false });
  };

  callWagtail = async (path: string) => {
    return await this.call(`wagtail/${path}`, 'GET');
  };
}

export interface PagedAPIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
