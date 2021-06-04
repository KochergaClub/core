import logging

logger = logging.getLogger(__name__)

import kocherga.cm.models
import kocherga.cm.tools
import kocherga.slack.client
import kocherga.watchmen.models
import kocherga.wiki
import markdown
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.template.loader import render_to_string
from html2text import html2text
from rest_framework.exceptions import APIException

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


def add_watchman(
    short_name,
    full_name,
    email,
    password,
    vk,
    gender,
    skip_wiki=False,
    skip_cm_customer=False,
    skip_cm_user=False,
):
    if not email.endswith('@gmail.com'):
        raise APIException("Only @gmail.com emails are supported")

    # Look up CM customer early to avoid semi-broken outcome when the CM customer doesn't exist.
    cm_customer = None
    if not skip_cm_customer:
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

    logger.info('Creating Member')
    # FIXME - serializer for validation
    member = Member.objects.create(
        short_name=short_name,
        full_name=full_name,
        role='WATCHMAN',
        payment_type='CASH',
        user=user,
        cm_customer=cm_customer,
        vk=vk,
        gender=gender,
    )

    if not skip_wiki:
        logger.info('Creating wiki account')
        wiki = kocherga.wiki.get_wiki()
        wiki.api(action='query', meta='tokens', type='createaccount')
        wiki_token = wiki.api(action='query', meta='tokens', type='createaccount')[
            'query'
        ]['tokens']['createaccounttoken']

        wiki.post(
            action='createaccount',
            createtoken=wiki_token,
            username=full_name,
            password=password,
            retype=password,
            createreturnurl='https://kocherga.club',
        )

    cm_user = None
    if not skip_cm_user:
        logger.info('Adding to Cafe Manager')
        cm_user = kocherga.cm.tools.add_manager(
            login=email.split('@')[0],
            name=full_name,
            password=password,
            email=email,
        )
        member.cm_login = cm_user.login
    member.save()

    logger.info('Granting Google Drive and Calendar permissions')
    member.grant_google_permissions()

    kocherga.watchmen.models.Watchman.objects.create(member=member)

    logger.info("Success! Time to send notifications")
    html_message = markdown.markdown(
        render_to_string(
            'staff/email/new_watchman.md',
            {
                'full_name': full_name,
                'password': password,
                'cm_login': cm_user.login if cm_user else 'UNDEFINED',
            },
        )
    )
    send_mail(
        subject='Доступы в Кочергу',
        from_email='Кочерга <info@kocherga-club.ru>',
        html_message=html_message,
        message=html2text(html_message),
        recipient_list=[email],
    )

    kocherga.slack.client.client().api_call(
        "chat.postMessage",
        text=f'Новый сотрудник: {short_name} / {full_name} / {email}',
        channel='#team',
    )
