// Hosts are bound through k8s

export const API_HOST = 'kocherga-backend';
export const API_ASYNC_HOST =
  process.env.NODE_ENV === 'development'
    ? 'kocherga-backend'
    : 'kocherga-backend-async';
