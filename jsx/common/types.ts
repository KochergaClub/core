import { Store } from '~/redux/store';

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
