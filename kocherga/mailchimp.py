import logging
logger = logging.getLogger(__name__)

from django.conf import settings

import time
import json
import requests

MAILCHIMP_API = f"https://{settings.KOCHERGA_MAILCHIMP_DATACENTER}.api.mailchimp.com/3.0"
MAILCHIMP_API_KEY = settings.KOCHERGA_MAILCHIMP_API_KEY
MAIN_LIST_ID = settings.KOCHERGA_MAILCHIMP_MAIN_LIST_ID


class NotFoundException(Exception):
    pass


def api_call(method, url, data={}):
    if method == "GET":
        r = requests.get(
            f"{MAILCHIMP_API}/{url}",
            headers={"Authorization": f"apikey {MAILCHIMP_API_KEY}"},
        )
    elif method == "POST":
        r = requests.post(
            f"{MAILCHIMP_API}/{url}",
            headers={
                "Authorization": f"apikey {MAILCHIMP_API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps(data),
        )
    elif method == "PUT":
        # copy-pasted!
        r = requests.put(
            f"{MAILCHIMP_API}/{url}",
            headers={
                "Authorization": f"apikey {MAILCHIMP_API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps(data),
        )
    else:
        raise Exception(f"Unknown method {method}")

    if r.status_code >= 400:
        raise Exception(f"Error: {r.status_code} {r.reason}\n\n{r.text}")
    r.raise_for_status()

    return r.json()


def folder_id_by_name(name):
    response = api_call('GET', 'campaign-folders')
    return next(
        f['id']
        for f in response['folders']
        if f['name'] == name
    )


def wait_for_batch(batch_id):
    url = MAILCHIMP_API + '/batches/' + batch_id

    while True:
        r = requests.get(
            url,
            {
                'fields': 'status,total_operations,finished_operations,errored_operations,response_body_url',
            },
            headers={
                'Authorization': 'apikey ' + MAILCHIMP_API_KEY,
            },
        )

        body = json.loads(r.text)
        logger.info(body)
        if body['status'] == 'finished':
            break
        time.sleep(1)


# Used in setup only
def create_campaign_folder(name):
    folders = api_call(
        'GET',
        '/campaign-folders',
    )['folders']

    if name in [f['name'] for f in folders]:
        # folder already exists
        return

    api_call(
        'POST',
        '/campaign-folders',
        {
            'name': name,
        }
    )


# Used in setup only
def create_file_folder(name):
    folders = api_call(
        'GET',
        '/file-manager/folders',
    )['folders']

    if name in [f['name'] for f in folders]:
        # folder already exists
        return

    api_call(
        'POST',
        '/file-manager/folders',
        {
            'name': name,
        }
    )


def segment_by_name(name, list_id=MAIN_LIST_ID):
    items = api_call(
        'GET',
        f'/lists/{list_id}/segments',
    )['segments']

    try:
        return next(i for i in items if i['name'] == name)
    except StopIteration:
        raise NotFoundException()


def interest_category_by_name(name, list_id=MAIN_LIST_ID):
    items = api_call(
        'GET',
        f'/lists/{list_id}/interest-categories',
    )['categories']

    try:
        return next(i for i in items if i['title'] == name)
    except StopIteration:
        raise NotFoundException()


def interest_by_name(category_id, name, list_id=MAIN_LIST_ID):
    items = api_call(
        'GET',
        f'/lists/{list_id}/interest-categories/{category_id}/interests',
    )['interests']

    try:
        return next(i for i in items if i['name'] == name)
    except StopIteration:
        raise NotFoundException()


def image_folder_by_name(name, list_id=MAIN_LIST_ID):
    folders = api_call(
        'GET',
        '/file-manager/folders',
    )['folders']

    return next(f for f in folders if f['name'] == name)
