import { IS_SERVER } from './utils';

const fetch = IS_SERVER ? require('node-fetch').default : window.fetch;

// This function is useful for client side only.
// In most cases you should use GlobalContext.csrfToken or <CSRFInput /> instead.
export const getCSRFToken = () => {
  if (typeof document === 'undefined') {
    throw Error(
      "Server-side rendering doesn't allow CSRF tokens, use GlobalContext instead"
    );
  }
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};

interface WebSocket {
  onmessage: (e: MessageEvent) => void;
  close: () => void;
}

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

interface APIProps {
  csrfToken: string;
  base?: string;
  cookie?: string;
  realHost?: string;
  wagtailAPIToken?: string;
}

export class API {
  csrfToken: string;
  base: string;
  cookie: string;
  realHost: string;
  wagtailAPIToken: string;

  constructor(props: APIProps) {
    this.csrfToken = props.csrfToken || '';
    this.base = props.base || '';
    this.cookie = props.cookie || '';
    this.realHost = props.realHost || '';
    this.wagtailAPIToken = props.wagtailAPIToken || '';
  }

  call = async (
    path: string,
    method: string,
    payload?: object,
    expectJSON: boolean = true
  ) => {
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
    if (path.startsWith('wagtail/')) {
      headers['X-WagtailAPIToken'] = this.wagtailAPIToken;
    }
    const params: RequestInit = {
      method,
      headers,
    };
    if (payload) {
      params.body = JSON.stringify(payload);
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

    if (expectJSON) {
      return await response.json();
    } else {
      return response;
    }
  };

  callWagtail = async (path: string) => {
    return await this.call(`wagtail/${path}`, 'GET');
  };
}
