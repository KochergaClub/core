# The basic deployment of Kocherga code is covered by https://gitlab.com/kocherga/code/deploy code.
# The database upgrades are covered by `alembic`.
#
# But there's also a question of setting up all our external services:
# * Mailchimp
# * VK hooks
# * Google documents
#
# This might be useful for several reasons:
# * Setting up a new environment for testing.
# * Deploying Kocherga code to the new installation bases (SaaS, franchizing, etc.)
# * Providing a more controlled and predictable way for changing our configuration (i.e., not just setting up initially, but upgrading).
#
# This module should provide the way to set up all of those (but does so only partially for now).

import logging
logger = logging.getLogger(__name__)

import kocherga.config

import kocherga.vk.api
import kocherga.vk.helpers
import kocherga.mailchimp
import kocherga.email.weekly_digest

def get_vk_group_id():
    group = kocherga.config.config()['vk']['main_page']['id']
    return kocherga.vk.helpers.group2id(group)

def find_vk_callback_server():
    group_id = get_vk_group_id()
    response = kocherga.vk.api.call('groups.getCallbackServers', { 'group_id': group_id })
    server = next(
        (s for s in response['items'] if s['title'] == 'Kocherga API'),
        None
    )
    return server


def create_vk_callback_server():
    raise NotImplementedError


def install_vk_callback_api():
    server = find_vk_callback_server()
    if not server:
        server = create_vk_callback_server()

    result = kocherga.vk.api.call('groups.setCallbackSettings', {
        'group_id': get_vk_group_id(),
        'server_id': server['id'],
        'api_version': kocherga.vk.api.API_VERSION,
        'message_new': 1,
        'wall_reply_new': 1,
        'wall_post_new': 1,
        'board_post_new': 1,
        'photo_comment_new': 1,
        'video_comment_new': 1,
        'market_comment_new': 1,
    })
    print(result)

def create_mailchimp_file_folder(name):
    folders = kocherga.mailchimp.api_call(
        'GET',
        '/campaign-folders',
    )['folders']

    if name in [f['name'] for f in folders]:
        return # already exists

    kocherga.mailchimp.api_call(
        'POST',
        '/campaign-folders',
        {
            'name': name,
        }
    )

def create_mailchimp_interest_group(name, cat_type):
    try:
        kocherga.mailchimp.interest_category_by_name(name)
    except kocherga.mailchimp.NotFoundException:
        logger.info(f'Interest group {name} not found, creating')
        kocherga.mailchimp.api_call(
            'POST',
            f'lists/{kocherga.mailchimp.MAIN_LIST_ID}/interest-categories',
            {
                'title': name,
                'type': cat_type,
            },
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
            {
                'name': name,
            },
        )

def setup_mailchimp():
    kocherga.mailchimp.create_file_folder(kocherga.email.weekly_digest.IMAGE_FOLDER_NAME)
    kocherga.mailchimp.create_campaign_folder('Еженедельная рассылка')
    kocherga.mailchimp.create_campaign_folder('Воркшопы')
    create_mailchimp_interest_group('Подписки', 'checkboxes')
    create_mailchimp_interest_group('Участники воркшопа', 'hidden')
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
                            kocherga.mailchimp.interest_by_name(cat_id, 'Расписание мероприятий')['id']
                        ],
                    }
                ],
            },
        }
    )
