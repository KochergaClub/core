import { Store } from '~/redux/store';
import { NextPageContext as OriginalNextPageContext } from 'next-server/dist/lib/utils';

export type AnyInitialLoader<B, P> = (store: Store, source: B) => Promise<P>;

// TODO - replace with `location` from react-router
interface LocationData {
  params: { [k: string]: string };
  query: { [k: string]: string };
}

export type InitialLoader<P> = AnyInitialLoader<LocationData, P>;

export interface AnyScreen<B, P> {
  component: React.ComponentType<P>;
  getInitialData?: AnyInitialLoader<B, P>;
}

export type Screen<P> = AnyScreen<LocationData, P>;

export interface User {
  is_authenticated: boolean;
  permissions: string[];
  is_staff?: boolean;
  email?: string;
}

export type NextPageContext = OriginalNextPageContext & { store: Store };

// copy-pasted from next-js types to patch getInitialProps context type
export type NextPage<P = {}, IP = P> = {
  (props: P): JSX.Element | null;
  defaultProps?: Partial<P>;
  displayName?: string;
  getInitialProps?(ctx: NextPageContext): Promise<IP>;
};
