import kocherga.slackbot

import kocherga.slack

SLACK_VERIFICATION_TOKEN = kocherga.slack.verification_token()
SLACK_WORKPLACE_TOKEN = kocherga.slack.token()
PORT = kocherga.config.config()["ludwig_port"]

bot = kocherga.slackbot.Bot(PORT, SLACK_WORKPLACE_TOKEN, SLACK_VERIFICATION_TOKEN)
