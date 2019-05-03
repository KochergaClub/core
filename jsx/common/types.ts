import { API } from './api';

export type InitialLoader<P> = (
  context: GlobalContextShape,
  params: any,
  query: any
) => Promise<P>;

export interface Screen<P> {
  component: React.ComponentType<P>;
  getInitialData?: InitialLoader<P>;
}

export interface User {
  is_authenticated: boolean;
  permissions: string[];
  is_staff?: boolean;
  email?: string;
}

export interface GlobalContextShape {
  api: API;
  user: User;
}
