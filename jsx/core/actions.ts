import { APIProps } from '~/common/api';

export const API_CONFIGURE = '[core] API_CONFIGURE';
export const API_CLEANUP_FOR_CLIENT = '[core] API_CLEANUP_FOR_CLIENT';

export const configureAPI = (props: APIProps) => ({
  type: API_CONFIGURE as typeof API_CONFIGURE,
  payload: props,
});

export const cleanupAPIForClient = () => ({
  type: API_CLEANUP_FOR_CLIENT as typeof API_CLEANUP_FOR_CLIENT,
});

export type Action =
  | ReturnType<typeof configureAPI>
  | ReturnType<typeof cleanupAPIForClient>;
