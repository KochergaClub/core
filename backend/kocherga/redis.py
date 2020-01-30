import redis


def get_redis():
    return redis.Redis(host='kocherga-redis', port=6379, db=0)
