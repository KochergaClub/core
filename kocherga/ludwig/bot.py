import logging
logger = logging.getLogger(__name__)

from django.conf import settings

import slappy

import pytz
from raven.contrib.flask import Sentry

import kocherga.slack

SLACK_SIGNING_SECRET = settings.KOCHERGA_SLACK_SIGNING_SECRET
SLACK_WORKPLACE_TOKEN = kocherga.slack.token()

PORT = settings.KOCHERGA_LUDWIG_PORT


class Bot(slappy.Bot):
    pass


def create_bot():
    bot = Bot(
        PORT,
        SLACK_WORKPLACE_TOKEN,
        SLACK_SIGNING_SECRET,
        timezone=pytz.timezone(
            "Europe/Moscow"
        ),  # can't use kocherga.datetime.TZ - it's based on dateutil.tz now
        alt_names=['людвиг']
    )

    sentry_dsn = settings.KOCHERGA_LUDWIG_SENTRY_DSN
    if sentry_dsn:
        sentry = Sentry(bot.flask_app, dsn=sentry_dsn, wrap_wsgi=False)

    return bot


bot = create_bot()
