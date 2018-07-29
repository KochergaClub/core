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
    req_secret = request.args.get("secret")
    assert req_secret == VK_SECRET

    payload = await request.get_json()

    if payload["type"] == "message_new":
        result = kocherga.slack.client().api_call(
            "chat.postMessage",
            text='Новое сообщение вк-сообществу',
            channel='#test',
        )
        if not result['ok']:
            raise Exception("processing failed")

    Session().commit()
    return "ok"
