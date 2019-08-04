import { API } from './api';
import { Store } from 'redux';

export type AnyInitialLoader<B, P> = (
  context: GlobalContextShape,
  source: B
) => Promise<P>;

interface ExpressSource {
  params: { [k: string]: string };
  query: { [k: string]: string };
}

export type InitialLoader<P> = AnyInitialLoader<ExpressSource, P>;

export interface AnyScreen<B, P> {
  component: React.ComponentType<P>;
  getInitialData?: AnyInitialLoader<B, P>;
}

export type Screen<P> = AnyScreen<ExpressSource, P>;

export interface User {
  is_authenticated: boolean;
  permissions: string[];
  is_staff?: boolean;
  email?: string;
}

export interface GlobalContextShape {
  api: API;
  user: User;
  store: Store;
}
