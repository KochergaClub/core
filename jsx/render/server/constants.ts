// Hosts are bound through docker-compose
export const API_HOST = 'api';
export const API_ASYNC_HOST =
  process.env.NODE_ENV === 'development' ? 'api' : 'api-async';
