import requests

from django.conf import settings

import kocherga.cm.tools

from .helpers import upload_cover_image, group2id

group_id = group2id(settings.KOCHERGA_VK["main_page"]["id"])


def update_cover():
    now_total = kocherga.cm.tools.now_stats()['total']

    api_root = settings.KOCHERGA_API_ROOT
    r = requests.get(
        f"{api_root}/templater/vk-cover/png",
        params={
            "now_total": now_total,
        },
    )
    r.raise_for_status()
    image_bytes = r.content

    upload_cover_image(group_id, image_bytes)
