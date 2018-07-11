import json
import requests
import hashlib

import kocherga.secrets
from kocherga.config import config

import kocherga.mailchimp

def populate_main_list(users):
    LIST_ID = config()['mailchimp']['main_list_id']

    data = {
        'operations': [
            {
                'method': 'PUT',
                'path': 'lists/{}/members/{}'.format(LIST_ID, hashlib.md5(user['email'].lower().encode()).hexdigest()),
                'body': json.dumps({
                    'email_type': 'html',
                    'email_address': user['email'],
                    'merge_fields': {
                        'FNAME': user['first_name'],
                        'LNAME': user['last_name'],
                    },
                    'status_if_new': 'subscribed',
                }),
            }
            for user in users
        ]
    }
    result = kocherga.mailchimp.api_call('POST', 'batches', data)

    batch_id = result['id']

    kocherga.mailchimp.wait_for_batch(batch_id)
