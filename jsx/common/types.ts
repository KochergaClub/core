import { API } from './api';

export type InitialLoader = (api: API, params: any, query: any) => Promise<any>;

export interface Screen {
  component: React.ComponentType;
  getInitialData?: InitialLoader;
}
