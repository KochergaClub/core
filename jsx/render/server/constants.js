// Hosts are bound through docker-compose

if (process.env.NO_DOCKER_DEV) {
  exports.API_HOST = 'localhost:8001';
  exports.API_ASYNC_HOST = 'localhost:8001';
} else {
  exports.API_HOST = 'api';
  exports.API_ASYNC_HOST =
    process.env.NODE_ENV === 'development' ? 'api' : 'api-async';
}
