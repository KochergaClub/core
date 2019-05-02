import { API } from './api';

export interface GlobalContextShape {
  api: API;
  user: User;
}

export type InitialLoader = (
  context: GlobalContextShape,
  params: any,
  query: any
) => Promise<any>;

export interface Screen {
  component: React.ComponentType;
  getInitialData?: InitialLoader;
}

export interface User {
  is_authenticated: boolean;
  permissions: string[];
}
