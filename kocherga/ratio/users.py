import logging
logger = logging.getLogger(__name__)

import hashlib

import kocherga.mailchimp

LIST_ID = kocherga.mailchimp.MAIN_LIST_ID
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

    logger.info(f'Group id: {interest["id"]}')
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


def training_category_id():
    category = kocherga.mailchimp.interest_category_by_name(MAILCHIMP_TRAINING_CATEGORY_NAME)
    return category['id']


def training2mailchimp(training):
    group_id = create_new_mailchimp_training_group(training_category_id(), training)

    for ticket in training.tickets.all():
        if ticket.status != 'normal':
            logger.info(f'Skip {ticket.email} - status {ticket.status}')
            continue
        import_ticket_to_mailchimp(ticket, group_id)
        logger.info(f'Added {ticket.email}')

    training.mailchimp_interest_id = group_id
    training.save()
