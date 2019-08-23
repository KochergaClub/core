import logging
logger = logging.getLogger(__name__)

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework.exceptions import APIException

import kocherga.wiki
import kocherga.cm.tools
import kocherga.cm.models
import kocherga.slack.client
import kocherga.watchmen.models

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


def add_watchman(short_name, full_name, email, password, vk, gender):
    if not email.endswith('@gmail.com'):
        raise APIException("Only @gmail.com emails are supported")

    # Look up CM customer early to avoid semi-broken outcome when the CM customer doesn't exist.
    try:
        cm_customer = kocherga.cm.models.Customer.objects.get(email=email)
    except kocherga.cm.models.Customer.DoesNotExist:
        raise APIException(
            f"Cafe Manager customer with email {email} not found, please add the customer first"
            f"(and wait ~30 minutes for the sync)"
        )

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
    # FIXME - serializer for validation
    member = Member.objects.create(
        short_name=short_name,
        full_name=full_name,
        role='WATCHMAN',
        is_current=True,
        payment_type='CASH',
        user=user,
        cm_customer=cm_customer,
        vk=vk,
        gender=gender,
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
    sc = kocherga.slack.client.legacy_token_client()

    # undocumented api - see https://github.com/ErikKalkoken/slackApiDoc/blob/master/users.admin.invite.md
    sc.api_call(
        'users.admin.invite',
        email=email,
        first_name=full_name.split(' ')[0],
        last_name=full_name.split(' ')[-1],
    )

    logger.info(f'Adding to Cafe Manager')
    cm_user = kocherga.cm.tools.add_manager(
        login=email.split('@')[0],
        name=full_name,
        password=password,
        email=email,
    )
    member.cm_login = cm_user.login
    member.save()

    logger.info(f'Granting Google Drive and Calendar permissions')
    member.grant_google_permissions()

    kocherga.watchmen.models.Watchman.objects.create(member=member)

    logger.info("Success! Time to send notifications")
    message = render_to_string('ratio/email/new_watchman.md', {
        'full_name': full_name,
        'password': password,
        'cm_login': cm_user.login,
    })
    send_mail(
        subject='Доступы в Кочергу',
        from_email='Кочерга <info@kocherga-club.ru>',
        message=message,
        recipient_list=[email],
    )

    kocherga.slack.client.client().api_call(
        "chat.postMessage",
        text=f'Новый админ: {short_name} / {full_name} / {email}',
        channel='#space_management',
    )
