import logging
import os

default_app_config = "kocherga.mastermind_bot.apps.Config"

from django.db.backends.signals import connection_created


def on_connection_created(**_):
    if "STARTBOT" not in os.environ:
        return
    from . import run_bot


connection_created.connect(on_connection_created)
