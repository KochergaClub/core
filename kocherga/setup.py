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

import kocherga.vk
import kocherga.config

def get_vk_group_id():
    group = kocherga.config.config()['vk']['main_page']['id']
    return kocherga.vk.group2id(group)

def find_vk_callback_server():
    group_id = get_vk_group_id()
    response = kocherga.vk.call('groups.getCallbackServers', { 'group_id': group_id })
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

    result = kocherga.vk.call('groups.setCallbackSettings', {
        'group_id': get_vk_group_id(),
        'server_id': server['id'],
        'api_version': kocherga.vk.API_VERSION,
        'message_new': 1,
        'wall_reply_new': 1,
        'wall_post_new': 1,
        'board_post_new': 1,
        'photo_comment_new': 1,
        'video_comment_new': 1,
        'market_comment_new': 1,
    })
    print(result)
