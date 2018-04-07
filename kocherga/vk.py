import logging
logger = logging.getLogger(__name__)

import requests
import kocherga.secrets

from captcha_solver import CaptchaSolver

captcha_solver = CaptchaSolver('rucaptcha', api_key=kocherga.secrets.plain_secret('rucaptcha_key'))

API_VERSION = '5.69'

def api_key():
    return kocherga.secrets.plain_secret('vk_api_key')

KEY = api_key()

def check_response(r):
    if 'error' in r:
        raise Exception(r['error'])
    if 'response' not in r:
        raise Exception('Response field is empty in {}'.format(str(r)))

def wants_captcha(r):
    return r.get('error', {}).get('error_code') == 14

def new_token_url():
    return 'https://oauth.vk.com/authorize?client_id=6274394&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=groups,wall,photos,offline&response_type=token&v=5.69'

def call(method, params):
    params = dict(params) # copy - we'll modify it and don't want to affect the args
    params['access_token'] = api_key()
    params['v'] = API_VERSION

    r = None

    for trial in range(2):
        response = requests.post(
            'https://api.vk.com/method/{}'.format(method),
            data=params
        )
        logger.debug('response: ' + str(response.content))
        response.raise_for_status()
        r = response.json()

        if wants_captcha(r):
            logger.warn('Got a captcha, solving...')
            img_link = r['error']['captcha_img']
            img_content = requests.get(img_link).content
            captcha_key = captcha_solver.solve_captcha(img_content)

            logger.warn('Captcha solved: {}'.format(captcha_key))

            params['captcha_sid'] = r['error']['captcha_sid']
            params['captcha_key'] = captcha_key

            continue

        break

    check_response(r)

    return r['response'] # type: ignore
