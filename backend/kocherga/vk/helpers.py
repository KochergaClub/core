"""Helper functions for VK which are not specific to Kocherga.

More specific tools (cover generation, widgets, etc.) should go to other modules
such as kocherga.events.vk and kocherga.vk.tools.
"""

import logging
logger = logging.getLogger(__name__)

import re
import json
import requests

import kocherga.vk.api


def group2id(group_name):
    if type(group_name) == int:
        return group_name

    match = re.match(r'^(?:public|club|event)(\d+)', group_name)
    if match:
        return int(match.group(1))

    r = kocherga.vk.api.call("groups.getById", {"group_id": group_name})
    return r[0]["id"]


def upload_wall_image(group_id, image_bytes):
    upload_server = kocherga.vk.api.call(
        "photos.getWallUploadServer", {"group_id": group_id}
    )
    upload_url = upload_server["upload_url"]

    r = requests.post(upload_url, files={
        "file": ("image.png", image_bytes)
    })
    r.raise_for_status()

    # note that image upload doesn't wrap the result in {'response': ...},
    # so it doesn't need to be checked with kocherga.vk.check_response
    upload_response = r.json()

    if not upload_response.get('photo'):
        raise Exception('Invalid upload response: ' + str(upload_response))

    try:
        photo = json.loads(upload_response["photo"])
    except json.decoder.JSONDecodeError:
        raise Exception("Photo JSON is invalid: " + upload_response["photo"])

    if not len(photo):
        raise Exception("vk didn't like our image file")

    logger.debug("image upload response: " + str(upload_response))

    photo = kocherga.vk.api.call(
        "photos.saveWallPhoto",
        {
            "group_id": group_id,
            "photo": upload_response["photo"],
            "server": upload_response["server"],
            "hash": upload_response["hash"],
        },
    )

    photo_id = "photo{owner_id}_{id}".format(**photo[0])
    logger.info("photo id: " + str(photo_id))

    return photo_id


def upload_cover_image(group_id, image_bytes):
    upload_server = kocherga.vk.api.call(
        "photos.getOwnerCoverPhotoUploadServer", {
            "group_id": group_id,
            "crop_x": 0,
            "crop_y": 0,
            "crop_x2": 1590,
            "crop_y2": 400,
        }
    )
    upload_url = upload_server["upload_url"]

    r = requests.post(upload_url, files={
        "file": ("image.png", image_bytes)
    })
    r.raise_for_status()

    # note that image upload doesn't wrap the result in {'response': ...},
    # so it doesn't need to be checked with kocherga.vk.check_response
    upload_response = r.json()
    print(upload_response)

    photo = upload_response["photo"]

    if not len(photo):
        raise Exception("vk didn't like our image file")

    logger.debug("image upload response: " + str(upload_response))

    kocherga.vk.api.call(
        "photos.saveOwnerCoverPhoto",
        {
            "photo": upload_response["photo"],
            "hash": upload_response["hash"],
        },
    )
