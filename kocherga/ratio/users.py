import logging
logger = logging.getLogger(__name__)

from django.conf import settings

import re
import hashlib
from datetime import datetime

import kocherga.google
import kocherga.mailchimp

from .models import Training, Ticket

LIST_ID = kocherga.mailchimp.MAIN_LIST_ID
SPREADSHEET_ID = settings.KOCHERGA_RATIO_USERS_SPREADSHEET_ID
MAILCHIMP_TRAINING_CATEGORY_NAME = 'Участники тренингов'


def create_new_mailchimp_training_group(category_id, training):
    # check if interest already exists
    try:
        interest = kocherga.mailchimp.interest_by_name(category_id, training.name)
        logger.info(f"Group {training.name} already exists")
    except kocherga.mailchimp.NotFoundException:
        logger.info(f"Creating group {training.name}")
        interest = kocherga.mailchimp.api_call(
            "POST",
            f"lists/{LIST_ID}/interest-categories/{category_id}/interests",
            {"name": training.name},
        )

    return interest["id"]


def import_ticket_to_mailchimp(ticket, group_id):
    md5 = hashlib.md5(ticket.email.lower().encode()).hexdigest()
    logger.info({
        "FNAME": ticket.first_name,
        "LNAME": ticket.last_name,
        "USER_ID": ticket.uid(),
    })
    response = kocherga.mailchimp.api_call(
        "PUT",
        f"lists/{LIST_ID}/members/{md5}",
        {
            "email_type": "html",
            "email_address": ticket.email,
            "merge_fields": {
                "FNAME": ticket.first_name,
                "LNAME": ticket.last_name,
                "USER_ID": ticket.uid(),
            },
            "interests": {group_id: True},
            "status_if_new": "subscribed",
        },
    )
    return response["id"]


def training2mailchimp(training):
    category = kocherga.mailchimp.interest_category_by_name(MAILCHIMP_TRAINING_CATEGORY_NAME)
    group_id = create_new_mailchimp_training_group(category["id"], training)

    for ticket in training.tickets.all():
        import_ticket_to_mailchimp(ticket, group_id)
        logger.info(f'Added {ticket.email}')


# import from the legacy google sheets - to be removed
def sheet2db():
    gc = kocherga.google.gspread_client()

    spreadsheet = gc.open_by_key(SPREADSHEET_ID)
    worksheet = spreadsheet.worksheet(f"Все участники")

    rows = worksheet.get_all_records()

    status_values = {
        'Участник': 'normal',
        'Отказ': 'canceled',
    }
    ticket_type_values = {
        'обычный': 'normal',
        'стипендия': 'stipend',
        'стафф': 'staff',
        'замена': 'replacement',
        'перенос': 'carry-over',
    }
    payment_type_values = {
        '-': 'none',
        'timepad': 'timepad',
        'сайт': 'website',
        'краудфандинг': 'crowdfunding',
        'нал': 'cash',
        'счет': 'invoice',
        'точка': 'transfer',
    }
    paid_values = {
        'да': True,
        'нет': False,
    }

    for row in rows:
        training_name = row['Событие']
        try:
            training = Training.objects.get(pk=training_name)
        except Training.DoesNotExist:
            training = Training(name=training_name)
            training.save()

        ticket = Ticket(
            training=training,
            email=row['Емейл'],
            first_name=row['Имя'],
            last_name=row['Фамилия'],
            status=status_values[row['Статус']],
            ticket_type=ticket_type_values[row['Тип билета']],
            payment_type=payment_type_values[row['Вид оплаты']],
            payment_amount=row['Сумма'],
            paid=paid_values[row['Оплачено']],
            comment=row['Коммент'],
        )

        d = row['Когда']
        if d:
            if '.' in d:
                d = datetime.strptime(d, '%d.%m.%Y').date()
            else:
                d = datetime.strptime(d, '%Y-%m-%d').date()
            ticket.registration_date = d

        ticket.save()
