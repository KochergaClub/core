// Hosts are bound through docker-compose

export const API_HOST = process.env.NO_DOCKER_DEV ? 'localhost:8001' : 'api';
export const API_ASYNC_HOST = process.env.NO_DOCKER_DEV
  ? 'localhost:8001'
  : process.env.NODE_ENV
  ? 'api'
  : 'api-async';
