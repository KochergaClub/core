import logging
logger = logging.getLogger(__name__)

from django.conf import settings

import requests

from captcha_solver import CaptchaSolver

captcha_solver = CaptchaSolver(
    "rucaptcha", api_key=settings.KOCHERGA_RUCAPTCHA_KEY
)

API_VERSION = "5.80"


def api_key():
    return settings.KOCHERGA_VK_API_KEY

def group_api_key():
    return settings.KOCHERGA_VK_GROUP_API_KEY


def check_response(r):
    if "error" in r:
        raise Exception(r["error"])
    if "response" not in r:
        raise Exception("Response field is empty in {}".format(str(r)))


def wants_captcha(r):
    return r.get("error", {}).get("error_code") == 14


def new_token_url():
    redirect_uri = "https://oauth.vk.com/blank.html"
    scope = "groups,wall,photos,offline"
    client_id = settings.KOCHERGA_VK['client_id']
    return f"https://oauth.vk.com/authorize?client_id={client_id}&display=page&redirect_uri={redirect_uri}&scope={scope}&response_type=token&v={API_VERSION}"


def call(method, params, group_token=False):
    params = dict(params)  # copy - we'll modify it and don't want to affect the args

    params["access_token"] = group_api_key() if group_token else api_key()
    params["v"] = API_VERSION

    r = None

    for trial in range(2):
        response = requests.post(
            "https://api.vk.com/method/{}".format(method), data=params
        )
        logger.debug("response: " + str(response.content))
        response.raise_for_status()
        r = response.json()

        if wants_captcha(r):
            logger.warn("Got a captcha, solving...")
            img_link = r["error"]["captcha_img"]
            img_content = requests.get(img_link).content
            captcha_key = captcha_solver.solve_captcha(img_content)

            logger.warn("Captcha solved: {}".format(captcha_key))

            params["captcha_sid"] = r["error"]["captcha_sid"]
            params["captcha_key"] = captcha_key

            continue

        break

    check_response(r)

    return r["response"]  # type: ignore
