// Hosts are bound through docker-compose

export const API_HOST = process.env.NO_DOCKER_DEV
  ? 'localhost:5302'
  : 'kocherga-backend';
export const API_ASYNC_HOST = process.env.NO_DOCKER_DEV
  ? 'localhost:8001'
  : process.env.NODE_ENV
  ? 'kocherga-backend'
  : 'kocherga-backend-async';
