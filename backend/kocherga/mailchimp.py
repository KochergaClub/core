import logging

logger = logging.getLogger(__name__)

import hashlib
import json
import time

import requests

from django.conf import settings

MAILCHIMP_API = (
    f"https://{settings.KOCHERGA_MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0"
)
MAILCHIMP_API_KEY = settings.KOCHERGA_MAILCHIMP_API_KEY
MAIN_LIST_ID = settings.KOCHERGA_MAILCHIMP_MAIN_LIST_ID


class NotFoundException(Exception):
    pass


class MailchimpException(Exception):
    def __init__(self, message, status_code):
        super().__init__(message)
        self.status_code = status_code


def api_call(method, url, data={}):
    method2fn = {
        'GET': requests.get,
        'POST': requests.post,
        'DELETE': requests.delete,
        'PUT': requests.put,
        'PATCH': requests.patch,
    }
    extra_params = {}
    if method == 'GET':
        extra_params['params'] = data
    else:
        extra_params['data'] = json.dumps(data)

    headers = {
        "Authorization": f"apikey {MAILCHIMP_API_KEY}",
    }
    if method != 'GET':
        headers['Content-Type'] = 'application/json'

    if method not in method2fn:
        raise Exception(f"Unknown method {method}")

    r = method2fn[method](
        f"{MAILCHIMP_API}/{url}",
        headers=headers,
        **extra_params,
    )

    if r.status_code >= 400:
        raise MailchimpException(
            f"Error: {r.status_code} {r.reason}\n\n{r.text}", r.status_code
        )
    r.raise_for_status()

    if method == 'DELETE':
        return  # no json for delete calls
    return r.json()


def api_call_get_paginated(url, key):
    items = []
    COUNT = 1000
    offset = 0

    while True:
        response = api_call('GET', url, {'count': COUNT, 'offset': offset})
        items += response[key]

        if response['total_items'] > offset + COUNT:
            offset += COUNT
            continue
        break

    return items


def folder_id_by_name(name):
    folders = api_call_get_paginated('campaign-folders', 'folders')
    return next(f['id'] for f in folders if f['name'] == name)


def wait_for_batch(batch_id):
    url = MAILCHIMP_API + '/batches/' + batch_id

    while True:
        r = requests.get(
            url,
            {
                'fields': 'status,total_operations,finished_operations,errored_operations,response_body_url',
            },
            headers={'Authorization': 'apikey ' + MAILCHIMP_API_KEY},
        )

        body = json.loads(r.text)
        logger.info(body)
        if body['status'] == 'finished':
            break
        time.sleep(1)


# Used in setup only
def create_campaign_folder(name):
    folders = api_call_get_paginated('/campaign-folders', 'folders')

    if name in [f['name'] for f in folders]:
        # folder already exists
        return

    api_call('POST', '/campaign-folders', {'name': name})


# Used in setup only
def create_file_folder(name):
    folders = api_call_get_paginated('/file-manager/folders', 'folders')

    if name in [f['name'] for f in folders]:
        # folder already exists
        return

    api_call('POST', '/file-manager/folders', {'name': name})


def segment_by_name(name, list_id=MAIN_LIST_ID):
    items = api_call_get_paginated(f'/lists/{list_id}/segments', 'segments')

    try:
        return next(i for i in items if i['name'] == name)
    except StopIteration:
        raise NotFoundException()


def interest_category_by_name(name, list_id=MAIN_LIST_ID):
    items = api_call_get_paginated(
        f'/lists/{list_id}/interest-categories', 'categories'
    )

    try:
        return next(i for i in items if i['title'] == name)
    except StopIteration:
        raise NotFoundException()


def get_interests(category_id, list_id=MAIN_LIST_ID):
    items = api_call_get_paginated(
        f'/lists/{list_id}/interest-categories/{category_id}/interests', 'interests'
    )
    return items


def interest_by_name(category_id, name, list_id=MAIN_LIST_ID):
    items = api_call_get_paginated(
        f'/lists/{list_id}/interest-categories/{category_id}/interests', 'interests'
    )

    try:
        return next(i for i in items if i['name'] == name)
    except StopIteration:
        raise NotFoundException()


def image_folder_by_name(name, list_id=MAIN_LIST_ID):
    folders = api_call_get_paginated('/file-manager/folders', 'folders')

    return next(f for f in folders if f['name'] == name)


def campaign_web_link(campaign_web_id: int):
    return f'https://{settings.KOCHERGA_MAILCHIMP_DATACENTER}.admin.mailchimp.com/campaigns/edit?id={campaign_web_id}'


def subscriber_hash(email: str) -> str:
    return hashlib.md5(email.lower().encode()).hexdigest()


def get_member_by_email(email: str):
    email_hash = subscriber_hash(email)
    return api_call('GET', f'lists/{MAIN_LIST_ID}/members/{email_hash}')
