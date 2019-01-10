import logging

logger = logging.getLogger(__name__)

from datetime import timedelta

from kocherga.ludwig.bot import bot
from kocherga.cm.tools import extend_subscription
import kocherga.team


@bot.respond_to(r"новое\s+видео:\s+<(https://\S+)>")
def react_new_video(message, url):
    channel_id = message.body["channel"]
    response = message.sc.api_call("channels.info", channel=channel_id)
    if not response["ok"]:
        raise Exception("Couldn't load channel info: " + str(response))
    channel_name = response["channel"]["name"]
    if channel_name != "video_s":
        return "О новых видео надо писать в #video_s, а не сюда."

    user_id = message.body["user"]
    logger.info(f"Looking up {user_id}")

    response = message.sc.api_call("users.info", user=user_id)
    if not response["ok"]:
        raise Exception("Couldn't load user info")
    email = response["user"]["profile"]["email"]
    logger.info(f"Got email: {email}")

    team_member = kocherga.team.find_member_by_email(email)
    card_id = team_member.cm_card_id
    logger.info(f"Card ID: {card_id}")

    subscription_until = extend_subscription(card_id, timedelta(days=7))
    return f"Спасибо! :heart:\nАбонемент продлён до {subscription_until:%Y-%m-%d}."
