import logging
logger = logging.getLogger(__name__)

import time

from slackclient import SlackClient

from django.conf import settings

import channels.consumer


def token():
    return settings.KOCHERGA_SLACK_BOT_TOKEN


# workplace client
def client():
    return SlackClient(token())


_USERS_CACHE = []
_USERS_CACHED_TS = None
CACHE_PERIOD = 60


def users(sc=None):
    global _USERS_CACHE
    global _USERS_CACHED_TS

    now_ts = time.time()
    if _USERS_CACHED_TS and now_ts - _USERS_CACHED_TS < CACHE_PERIOD:
        logger.debug("return now stats from cache")
        return _USERS_CACHE

    if sc is None:
        sc = client()

    response = sc.api_call("users.list")

    if not response["ok"]:
        raise Exception("Couldn't load the list of users")

    _USERS_CACHE = [m for m in response["members"] if not m.get('deleted')]
    _USERS_CACHED_TS = now_ts
    return _USERS_CACHE


def users_by_id(sc=None):
    _users = users(sc)
    result = {}
    for user in _users:
        result[user["id"]] = user

    return result


def users_by_email(sc=None):
    _users = users(sc)
    result = {}
    for user in _users:
        email = user.get("profile", {}).get("email", None)
        if not email:
            continue
        result[email.lower()] = user

    return result


class NotifyConsumer(channels.consumer.SyncConsumer):
    def notify(self, message):
        logger.info(f"Notifying Slack: {message['text']}")

        args = {
            'text': message['text'],
            'channel': message['channel'],
        }
        if 'attachments' in message:
            logger.info('Message has attachments')
            args['attachments'] = message['attachments']

        client().api_call(
            "chat.postMessage",
            **args
        )
