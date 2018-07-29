import logging
logger = logging.getLogger(__name__)

import json

from quart import Blueprint, request

import kocherga.config
import kocherga.slack

# Routes for external hooks.

bp = Blueprint("hooks", __name__)

VK_SECRET = kocherga.config.config()['vk']['callback_secret']

@bp.route("/hooks/vk_callback", methods=["POST"])
async def r_vk_callback():
    payload = await request.get_json()

    req_secret = payload["secret"]
    assert req_secret == VK_SECRET

    # sorry for hardcode, I'll fix this later with https://vk.com/dev/groups.addCallbackServer
    if payload["type"] == "confirmation" and payload["group_id"] == 99973027:
        return "f4cc4bd9"

    channel = '#vk_support'

    obj = payload["object"]
    group_id = payload["group_id"]

    def notify(prefix, link):
        result = kocherga.slack.client().api_call(
            "chat.postMessage",
            text=f'{prefix}: {link}\n>>> {obj["text"]}',
            channel=channel,
        )
        if not result['ok']:
            raise Exception("Slack notification failed")

    if payload["type"] == "message_new":
        notify(
            'Новое сообщение вк-сообществу',
            f'https://vk.com/gim{group_id}?sel={obj["from_id"]}'
        )
    elif payload["type"] == "wall_reply_new":
        notify(
            'Новый комментарий',
            f'https://vk.com/wall-{group_id}_{obj["post_id"]}?reply={obj["id"]}'
        )
    elif payload["type"] == "wall_post_new":
        notify(
            'Новый пост',
            f'https://vk.com/wall-{group_id}_{obj["id"]}'
        )
    elif payload["type"] == "board_post_new":
        notify(
            'Новый комментарий в обсуждении',
            f'https://vk.com/topic-{group_id}_{obj["topic_id"]}?post={obj["id"]}'
        )
    elif payload["type"] == "photo_comment_new":
        notify(
            'Новый комментарий к фотографии',
            f'https://vk.com/photo-{group_id}_{obj["photo_id"]}'
        )
    elif payload["type"] == "video_comment_new":
        notify(
            'Новый комментарий к видеозаписи',
            f'https://vk.com/video-{group_id}_{obj["video_id"]}'
        )
    elif payload["type"] == "market_comment_new":
        notify(
            'Новый комментарий к товару',
            f'https://vk.com/club{group_id}?w=product-{group_id}_{obj["item_id"]}
        )

    return "ok"
