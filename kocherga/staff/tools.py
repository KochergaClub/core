import logging
logger = logging.getLogger(__name__)

import kocherga.wiki
from django.contrib.auth import get_user_model
import kocherga.cm.tools
import kocherga.cm.models

from .models import Member


def members(include_former=False):
    result = list(Member.objects.all())
    if not include_former:
        result = [m for m in result if m.is_current]

    return result


def find_member_by_short_name(short_name):
    return next(filter(lambda m: m.short_name == short_name, members()), None)


def find_member_by_email(email):
    for member in members():
        if member.user.email.lower() == email.lower():
            return member
        if email.lower() in [a.email for a in member.alt_emails.all()]:
            return member
    return None


def add_watchman(short_name, full_name, email, password):
    if not email.endswith('@gmail.com'):
        raise Exception("Only @gmail.com emails are supported")

    # Look up CM customer early to avoid semi-broken outcome when the CM customer doesn't exist.
    cm_customer = kocherga.cm.models.Customer.objects.get(email=email)

    logger.info(f'Add watchman {full_name} with email {email}')

    logger.info('Looking for user record')
    User = get_user_model()
    user = None
    try:
        logger.info(f'Found user for email {email}')
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        logger.info(f'User for email {email} not found, creating...')
        user = User.objects.create_user(email)

    user.is_staff = True
    user.save()

    logger.info(f'Creating Member')
    member = Member.objects.create(
        short_name=short_name,
        full_name=full_name,
        role='WATCHMAN',
        is_current=True,
        payment_type='CASH',
        user=user,
        cm_customer=cm_customer,
    )

    logger.info(f'Creating wiki account')
    wiki = kocherga.wiki.get_wiki()
    wiki.api(action='query', meta='tokens', type='createaccount')
    wiki_token = wiki.api(
        action='query',
        meta='tokens',
        type='createaccount'
    )['query']['tokens']['createaccounttoken']

    wiki.post(
        action='createaccount',
        createtoken=wiki_token,
        username=full_name,
        password=password,
        retype=password,
        createreturnurl='https://kocherga.club',
    )

    logger.info(f'Inviting to slack')
    sc = kocherga.slack.legacy_token_client()

    # undocumented api - see https://github.com/ErikKalkoken/slackApiDoc/blob/master/users.admin.invite.md
    sc.api_call(
        'users.admin.invite',
        email=email,
        first_name=full_name.split(' ')[0],
        last_name=full_name.split(' ')[-1],
    )

    logger.info(f'Adding to Cafe Manager')
    kocherga.cm.tools.add_manager(
        login=email.split('@')[0],
        name=full_name,
        password=password,
        email=email,
    )

    logger.info(f'Granting Google Drive and Calendar permissions')
    member.grant_google_permissions()
