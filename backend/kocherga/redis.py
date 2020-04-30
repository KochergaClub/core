import redis

from django.conf import settings


def get_redis_connect_args():
    return {
        "host": settings.REDIS_HOST,
        "port": 6379,
        "db": 0,
    }


def get_redis():
    return redis.Redis(**get_redis_connect_args())
