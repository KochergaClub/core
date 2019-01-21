import logging
logger = logging.getLogger(__name__)

from datetime import timedelta

from kocherga.ludwig.bot import bot
import kocherga.staff.tools


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

    staff_member = kocherga.staff.tools.find_member_by_email(email)

    subscription_until = staff_member.cm_customer.extend_subscription(timedelta(days=7))
    return f"Спасибо! :heart:\nАбонемент продлён до {subscription_until:%Y-%m-%d}."
