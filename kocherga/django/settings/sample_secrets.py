"""This module documents which secrets you need to run the full kocherga-core app.

In production, we use prod_secrets.py which is not commited to this repo for obvious reasons."""

SECRET_KEY = None # put any long random string here

# AWS credentials
AWS_ACCESS_KEY_ID = None
AWS_SECRET_ACCESS_KEY = None

KOCHERGA_JWT_SECRET_KEY = None # another long random string

# ses-smtp-user credentials from AWS
EMAIL_HOST_USER = None
EMAIL_HOST_PASSWORD = None

KOCHERGA_MAILCHIMP_UID_SALT = None # whatever - used to anonymize email users in ratio experiments

CAFE_MANAGER_SERVER = 'https://demo.cafe-manager.ru'
CAFE_MANAGER_CREDENTIALS = {
    'login': 'admin',
    'password': 'admin',
}

KOCHERGA_FB_ANNOUNCER_PASSWORD = None  # real FB password, not a token

KOCHERGA_FB_MARKETING = {
    "access_token": "",  # Marketing API token (with ads_management permission)
    "account_id": "",  # Primary ads account id
    "audiences": {
        "ratio_tickets": "",  # custom audience id which can be uploaded
    },
}

KOCHERGA_GOOGLE_CREDENTIALS = {
    "type": "service_account",

    "project_id": None,
    "private_key_id": None,
    "private_key": "-----BEGIN PRIVATE KEY-----\n...",
    "client_email": None,
    "client_id": None,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": None,
}

KOCHERGA_MAILCHIMP_API_KEY = None

KOCHERGA_MONEY_OFD_YA_TOKEN = None

KOCHERGA_RUCAPTCHA_KEY = None

KOCHERGA_SLACK_BOT_TOKEN = 'xoxb-...'
KOCHERGA_SLACK_SIGNING_SECRET = None

KOCHERGA_TELEGRAM_TOKEN = None

KOCHERGA_TIMEPAD_TOKEN = None

KOCHERGA_MONEY_TOCHKA_CLIENT = {
    "client_id": "sandbox",
    "client_secret": "sandbox_secret",
}

KOCHERGA_VK_API_KEY = None

KOCHERGA_WIKI_PASSWORD = None

MASTERMIND_BOT_CONFIG = {
    "token": "tg-token-here"
}

KKM_USER_PASSWORD = 'fake_broken_password'
