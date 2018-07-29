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

    if payload["type"] == "message_new":
        obj = payload["object"]
        group_id = payload["group_id"]
        link = f'https://vk.com/gim{group_id}?sel={obj["from_id"]}'
        result = kocherga.slack.client().api_call(
            "chat.postMessage",
            text=f'Новое сообщение вк-сообществу: {link}\n>>> {obj["text"]}',
            channel='vk_support',
        )
        if not result['ok']:
            raise Exception("processing failed")

    return "ok"
