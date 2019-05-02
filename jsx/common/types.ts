import { API } from './api';

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
  is_staff?: boolean;
  email?: string;
}

export interface GlobalContextShape {
  api: API;
  user: User;
}
