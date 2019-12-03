from django.conf import settings

from slackclient import SlackClient


def token():
    return settings.KOCHERGA_SLACK_BOT_TOKEN


# workplace client
def client():
    return SlackClient(token())


# client with legacy token - used for invites only
def legacy_token_client():
    return SlackClient(settings.KOCHERGA_SLACK_LEGACY_TOKEN)
