"""
Methods for working with Tilda API.

Tilda API documentation: http://help-ru.tilda.ws/api
"""

import requests

from django.conf import settings


class TildaAPIException(Exception):
    pass


def api_call(method: str, params={}):
    r = requests.get(
        f'http://api.tildacdn.info/v1/{method}/',
        params={
            'publickey': settings.TILDA_PUBLIC_KEY,
            'secretkey': settings.TILDA_SECRET_KEY,
            **params,
        }
    )
    r.raise_for_status()
    response = r.json()
    if response['status'] != 'FOUND':
        raise TildaAPIException('Expected status=FOUND')

    return response['result']


def get_projects_list():
    return api_call('getprojectslist')


def get_pages_list(project_id=settings.TILDA_PROJECT_ID):
    return api_call('getpageslist', {'projectid': project_id})


def get_page_full(page_id):
    return api_call('getpagefull', {'pageid': page_id})
