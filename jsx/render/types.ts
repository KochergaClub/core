import { User, GlobalContextShape } from '~/common/types';

import { State } from '~/redux/store';

export interface ReactPageInfo {
  type: 'react';
  props: any; // FIXME; generic?
}

export interface WagtailPageInfo {
  type: 'wagtail';
  props: any; // FIXME
}

export interface ErrorPageInfo {
  type: 'error';
  code: number;
}

export type PageInfo = ReactPageInfo | WagtailPageInfo | ErrorPageInfo;

// Describes the context used for page rendering.
// This data is passed from server to client in window.RENDER_CONTEXT global var.
// The data in this structure should be JSON-serializable.
export interface RenderContext {
  user: User;
  csrfToken: string;
  reduxState: State;
  page: PageInfo;
}

export const buildRenderContext = (
  pageInfo: PageInfo,
  globalContext: GlobalContextShape
): RenderContext => {
  return {
    page: pageInfo,
    user: globalContext.user,
    csrfToken: globalContext.api.csrfToken,
    reduxState: globalContext.store.getState(),
  };
};
