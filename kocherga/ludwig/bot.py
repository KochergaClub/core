import logging
logger = logging.getLogger(__name__)

from django.conf import settings

import slappy

import pytz

import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

import kocherga.slack

SLACK_SIGNING_SECRET = settings.KOCHERGA_SLACK_SIGNING_SECRET
SLACK_WORKPLACE_TOKEN = kocherga.slack.token()


class Bot(slappy.Bot):
    pass


def create_bot():
    bot = Bot(
        workplace_token=SLACK_WORKPLACE_TOKEN,
        signing_secret=SLACK_SIGNING_SECRET,
        timezone=pytz.timezone(
            "Europe/Moscow"
        ),  # can't use kocherga.dateutils.TZ - it's based on dateutil.tz now
        alt_names=['людвиг']
    )

    sentry_dsn = settings.KOCHERGA_LUDWIG_SENTRY_DSN
    if sentry_dsn:
        sentry_sdk.init(
            dsn=sentry_dsn,
            integrations=[FlaskIntegration()]
        )

    return bot


bot = create_bot()
