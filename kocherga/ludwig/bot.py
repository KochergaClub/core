import slappy

import pytz
from flask_sqlalchemy import SQLAlchemy as SA
from raven.contrib.flask import Sentry

import kocherga.slack
import kocherga.db
import kocherga.config

SLACK_VERIFICATION_TOKEN = kocherga.slack.verification_token()
SLACK_WORKPLACE_TOKEN = kocherga.slack.token()

PORT = kocherga.config.config()["ludwig_port"]


class Bot(slappy.Bot):

    def cleanup_on_exception(self):
        kocherga.db.Session.remove()


# via https://github.com/mitsuhiko/flask-sqlalchemy/issues/589
class SQLAlchemy(SA):
    def apply_pool_defaults(self, app, options):
        SA.apply_pool_defaults(self, app, options)
        options["pool_pre_ping"] = True


def create_bot():
    bot = Bot(
        PORT,
        SLACK_WORKPLACE_TOKEN,
        SLACK_VERIFICATION_TOKEN,
        timezone=pytz.timezone(
            "Europe/Moscow"
        ),  # can't use kocherga.config.TZ - it's based on dateutil.tz now
        alt_names=['людвиг']
    )

    bot.flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    bot.flask_app.config["SQLALCHEMY_DATABASE_URI"] = kocherga.db.DB_URL
    kocherga.db.Session.replace(SQLAlchemy(bot.flask_app).session)

    sentry_dsn = kocherga.config.config().get("sentry", {}).get("ludwig", None)
    if sentry_dsn:
        sentry = Sentry(bot.flask_app, dsn=sentry_dsn, wrap_wsgi=False)

    return bot


bot = create_bot()
