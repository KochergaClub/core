import slappy

import pytz
from flask_sqlalchemy import SQLAlchemy
from raven.contrib.flask import Sentry

import kocherga.slack
import kocherga.db
import kocherga.config

SLACK_VERIFICATION_TOKEN = kocherga.slack.verification_token()
SLACK_WORKPLACE_TOKEN = kocherga.slack.token()

PORT = kocherga.config.config()["ludwig_port"]


class Bot(slappy.bot):

    def cleanup_on_exception(self):
        kocherga.db.Session.remove()


def create_bot():
    bot = slappy.Bot(
        PORT,
        SLACK_WORKPLACE_TOKEN,
        SLACK_VERIFICATION_TOKEN,
        timezone=pytz.timezone(
            "Europe/Moscow"
        ),  # can't use kocherga.config.TZ - it's based on dateutil.tz now
    )

    bot.flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    bot.flask_app.config["SQLALCHEMY_DATABASE_URI"] = kocherga.db.DB_URL
    kocherga.db.Session.replace(SQLAlchemy(bot.flask_app).session)

    sentry_dsn = kocherga.config.config().get("sentry", {}).get("ludwig", None)
    if sentry_dsn:
        sentry = Sentry(bot.flask_app, dsn=sentry_dsn, wrap_wsgi=False)

    return bot


bot = create_bot()
