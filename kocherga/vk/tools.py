import requests

import kocherga.config
import kocherga.cm.scraper

from .helpers import upload_cover_image, group2id

group_id = group2id(kocherga.config.config()["vk"]["main_page"]["id"])

def update_cover():
    now_total = kocherga.cm.scraper.now_stats()['total']

    web_root = kocherga.config.web_root()
    r = requests.get(
        f"{web_root}/templater/vk-cover/png",
        params={
            "now_total": now_total,
        },
    )
    r.raise_for_status()
    image_bytes = r.content

    upload_cover_image(group_id, image_bytes)
