import { NextPageContext as OriginalNextPageContext } from 'next/dist/next-server/lib/utils';

import { Store } from '~/redux/store';

export interface User {
  is_authenticated: boolean;
  permissions: string[];
  is_staff?: boolean;
  email?: string;
}

export type NextPageContext = OriginalNextPageContext & {
  store: Store;
};

// copy-pasted from next-js types to patch getInitialProps context type
export type NextPage<P = {}, IP = P> = {
  (props: P): JSX.Element | null;
  defaultProps?: Partial<P>;
  displayName?: string;
  getInitialProps?(ctx: NextPageContext): Promise<IP>;
};
