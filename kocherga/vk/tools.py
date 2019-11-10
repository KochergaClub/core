import logging
logger = logging.getLogger(__name__)

import requests

from django.conf import settings

import kocherga.cm.tools

from .helpers import upload_cover_image, group2id
from . import api

group_id = group2id(settings.KOCHERGA_VK["main_page"]["id"])


def update_cover():
    now_total = kocherga.cm.tools.now_stats()['total']

    api_root = settings.KOCHERGA_API_ROOT
    r = requests.get(
        f"{api_root}/templater/vk-cover/png",
        params={
            "now_total": now_total,
        },
    )
    r.raise_for_status()
    image_bytes = r.content

    upload_cover_image(group_id, image_bytes)


def find_top_friends(user_id: int, limit: int = 50):
    friend_ids = api.call('friends.get', {'user_id': user_id})['items']

    result = {}
    for friend_id in friend_ids[:20]:
        try:
            r = api.call('friends.get', {'user_id': friend_id})
            api.throttle()

            result[friend_id] = {'status': 'ok'}
            result[friend_id]['friends'] = r['count']
        except Exception as e:
            if 'User was deleted or banned' in str(e):
                # result[friend_id]['status'] = 'banned'
                continue
            elif 'this profile is private' in str(e):
                # result[friend_id]['status'] = 'private'
                continue
            else:
                raise

        r = api.call('users.getFollowers', {'user_id': friend_id})
        api.throttle()

        result[friend_id]['followers'] = r['count']

    for id in list(reversed(sorted(
            result.keys(),
            key=lambda id: result[id]['followers']
    )))[:limit]:
        logger.info(f"https://vk.com/id{id}\t{result[id]['followers']}")
