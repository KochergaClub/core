import redis


def get_redis():
    return redis.Redis(host='redis', port=6379, db=0)
