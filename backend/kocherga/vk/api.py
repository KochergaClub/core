import logging

logger = logging.getLogger(__name__)

from django.conf import settings

import time
import requests
import json
import urllib.parse

from captcha_solver import CaptchaSolver

captcha_solver = CaptchaSolver("rucaptcha", api_key=settings.KOCHERGA_RUCAPTCHA_KEY)

API_VERSION = "5.80"


def api_key():
    return settings.KOCHERGA_VK_API_KEY


def group_api_key():
    return settings.KOCHERGA_VK_GROUP_API_KEY


def check_response(r):
    if "error" in r:
        raise Exception(r["error"])
    if "execute_errors" in r:
        raise Exception(r["execute_errors"])
    if "response" not in r:
        raise Exception("Response field is empty in {}".format(str(r)))


def wants_captcha(r):
    return r.get("error", {}).get("error_code") == 14


def new_token_url():
    redirect_uri = "https://oauth.vk.com/blank.html"
    scope = "groups,wall,photos,offline"
    client_id = settings.KOCHERGA_VK['client_id']
    return f"https://oauth.vk.com/authorize?" + urllib.parse.urlencode(
        {
            "client_id": client_id,
            "display": "page",
            "redirect_uri": redirect_uri,
            "scope": scope,
            "response_type": "token",
            "v": API_VERSION,
        }
    )


def _call(method, params, group_token=False):
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
    return r


THROTTLE_COUNTER = 0


def throttle():
    global THROTTLE_COUNTER
    THROTTLE_COUNTER += 1
    if THROTTLE_COUNTER % 2 == 0:
        time.sleep(1)


def call(method, params, group_token=False):
    r = _call(method, params, group_token)
    return r["response"]  # type: ignore


def bulk_call(operations, group_token=False):
    lines = ['var result = [];\n']
    for operation in operations:
        method = operation['method']
        params = operation['params']
        line = f'result.push( API.{method}({json.dumps(params)}) );\n'
        lines.append(line)

    lines.append('return result;')

    r = _call('execute', {'code': ''.join(lines)}, group_token=group_token)
    return r['response']
