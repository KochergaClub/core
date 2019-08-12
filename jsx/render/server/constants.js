// Hosts are bound through docker-compose
exports.API_HOST = 'api';
exports.API_ASYNC_HOST =
  process.env.NODE_ENV === 'development' ? 'api' : 'api-async';
