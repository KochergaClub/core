from django.conf import settings
from slackclient import SlackClient


def token():
    return settings.KOCHERGA_SLACK_BOT_TOKEN


# workplace client
def client():
    return SlackClient(token())
