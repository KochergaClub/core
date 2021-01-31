import logging

logger = logging.getLogger(__name__)

import kocherga.events.models.weekly_digest
import kocherga.mailchimp
import kocherga.ratio.users
from django.conf import settings


def create_mailchimp_file_folder(name):
    folders = kocherga.mailchimp.api_call(
        'GET',
        '/campaign-folders',
    )['folders']

    if name in [f['name'] for f in folders]:
        # already exists
        return

    kocherga.mailchimp.api_call('POST', '/campaign-folders', {'name': name})


def create_mailchimp_interest_group(name, cat_type):
    try:
        kocherga.mailchimp.interest_category_by_name(name)
    except kocherga.mailchimp.NotFoundException:
        logger.info(f'Interest group {name} not found, creating')
        kocherga.mailchimp.api_call(
            'POST',
            f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/interest-categories',
            {'title': name, 'type': cat_type},
        )


def create_mailchimp_interest(category_name, name):
    category = kocherga.mailchimp.interest_category_by_name(category_name)
    category_id = category['id']
    try:
        kocherga.mailchimp.interest_by_name(category_id, name)
    except kocherga.mailchimp.NotFoundException:
        logger.info(f'Interest {name} not found, creating')
        kocherga.mailchimp.api_call(
            'POST',
            f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/interest-categories/{category_id}/interests',
            {'name': name},
        )


def create_webhook():
    list_result = kocherga.mailchimp.api_call(
        'GET', f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/webhooks'
    )
    urls = [webhook['url'] for webhook in list_result['webhooks']]
    for url in urls:
        if url.startswith(settings.KOCHERGA_WEBSITE):
            logger.info('Webhook already exists')
            return

    if 'localhost' in settings.KOCHERGA_WEBSITE:
        logger.warning("Website is localhost, can't create webhook")
        return

    if not settings.KOCHERGA_MAILCHIMP_WEBHOOK_SECRET:
        logger.warning(
            "KOCHERGA_MAILCHIMP_WEBHOOK_SECRET is not configured, can't create webhook"
        )
        return

    webhook_url = f'{settings.KOCHERGA_WEBSITE}/api/hooks/mailchimp?secret={settings.KOCHERGA_MAILCHIMP_WEBHOOK_SECRET}'
    kocherga.mailchimp.api_call(
        'POST',
        f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/webhooks',
        {
            'url': webhook_url,
            'events': {
                'subscribe': True,
                'unsubscribe': True,
                'campaign': True,
            },
            'sources': {
                'user': True,
                'admin': True,
                'api': True,
            },
        },
    )


def setup_mailchimp():
    kocherga.mailchimp.create_file_folder(
        kocherga.events.models.weekly_digest.MAILCHIMP_IMAGE_FOLDER_NAME
    )
    kocherga.mailchimp.create_campaign_folder(
        kocherga.events.models.weekly_digest.MAILCHIMP_CAMPAIGN_FOLDER_NAME
    )
    kocherga.mailchimp.create_campaign_folder('Воркшопы')
    create_mailchimp_interest_group('Подписки', 'checkboxes')
    create_mailchimp_interest_group(
        kocherga.ratio.users.MAILCHIMP_TRAINING_CATEGORY_NAME, 'hidden'
    )
    create_mailchimp_interest('Подписки', 'Материалы и новости')
    create_mailchimp_interest('Подписки', 'Расписание мероприятий')
    create_mailchimp_interest('Подписки', 'Уведомления о новых тренингах')

    cat_id = kocherga.mailchimp.interest_category_by_name('Подписки')['id']
    kocherga.mailchimp.api_call(
        'POST',
        f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/segments',
        {
            'name': 'Подписаны на расписание',
            'options': {
                'match': 'all',
                'conditions': [
                    {
                        'condition_type': 'Interests',
                        'op': 'interestcontains',
                        'field': f'interests-{cat_id}',
                        'value': [
                            kocherga.mailchimp.interest_by_name(
                                cat_id, 'Расписание мероприятий'
                            )['id']
                        ],
                    }
                ],
            },
        },
    )

    create_webhook()
