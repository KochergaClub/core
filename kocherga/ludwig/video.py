import logging
logger = logging.getLogger(__name__)

from datetime import timedelta

from kocherga.ludwig.bot import bot
from kocherga.cm import extend_subscription
import kocherga.team

@bot.listen_to(r'Людвиг,\s+новое\s+видео:\s+<(https://\S+)>')
def react_new_video(message, url):
    user_id = message.body['user']
    logger.info(f'Looking up {user_id}')
    print(f'Looking up {user_id}')

    response = message.sc.api_call('users.info', user=user_id)
    if not response['ok']:
        raise Exception("Couldn't load user info")
    email = response['user']['profile']['email']
    logger.info(f'Got email: {email}')

    team_member = kocherga.team.find_member_by_email(email)
    card_id = team_member.cm_card_id
    logger.info(f'Card ID: {card_id}')

    subscription_until = extend_subscription(card_id, timedelta(days=7))
    return(f'Спасибо! Абонемент продлён до {subscription_until:%Y-%m-%d}.')
