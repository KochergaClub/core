import redis

from django.conf import settings


def get_redis():
    return redis.Redis(host=settings.REDIS_HOST, port=6379, db=0)
