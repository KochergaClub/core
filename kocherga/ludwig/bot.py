import logging
logger = logging.getLogger(__name__)

import slappy

import pytz
from raven.contrib.flask import Sentry

import kocherga.slack
import kocherga.config
import kocherga.secrets

SLACK_SIGNING_SECRET = kocherga.secrets.plain_secret('slack_signing_secret')
SLACK_WORKPLACE_TOKEN = kocherga.slack.token()

PORT = kocherga.config.config()["ludwig_port"]


class Bot(slappy.Bot):
    pass


def create_bot():
    bot = Bot(
        PORT,
        SLACK_WORKPLACE_TOKEN,
        SLACK_SIGNING_SECRET,
        timezone=pytz.timezone(
            "Europe/Moscow"
        ),  # can't use kocherga.config.TZ - it's based on dateutil.tz now
        alt_names=['людвиг']
    )

    sentry_dsn = kocherga.config.config().get("sentry", {}).get("ludwig", None)
    if sentry_dsn:
        sentry = Sentry(bot.flask_app, dsn=sentry_dsn, wrap_wsgi=False)

    return bot


bot = create_bot()
