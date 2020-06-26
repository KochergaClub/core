import logging

logger = logging.getLogger(__name__)

from django.conf import settings

import kocherga.vk.api
import kocherga.vk.helpers


def get_vk_group_id():
    group = settings.KOCHERGA_VK['main_page']['id']
    return kocherga.vk.helpers.group2id(group)


def find_vk_callback_server():
    group_id = get_vk_group_id()
    response = kocherga.vk.api.call('groups.getCallbackServers', {'group_id': group_id})
    server = next((s for s in response['items'] if s['title'] == 'Kocherga API'), None)
    return server


def create_vk_callback_server():
    raise NotImplementedError


def install_vk_callback_api():
    server = find_vk_callback_server()
    if not server:
        server = create_vk_callback_server()

    result = kocherga.vk.api.call(
        'groups.setCallbackSettings',
        {
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
        },
    )
    logger.info(result)


def setup_vk():
    install_vk_callback_api()
