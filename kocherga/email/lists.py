import json
import requests
import hashlib
from collections import namedtuple

from typing import List

import kocherga.secrets
from kocherga.config import config

import kocherga.mailchimp

User = namedtuple("User", "email first_name last_name card_id")

def populate_main_list(users: List[User]):
    LIST_ID = config()['mailchimp']['main_list_id']

    operations = []
    for user in users:
        merge_fields = {
            'FNAME': user.first_name or '',
            'LNAME': user.last_name or '',
        }
        if user.card_id:
            merge_fields['CARD_ID'] = user.card_id
            merge_fields['HAS_CARD'] = 'True'

        operation = {
            'method': 'PUT',
            'path': 'lists/{}/members/{}'.format(LIST_ID, hashlib.md5(user.email.lower().encode()).hexdigest()),
            'body': json.dumps({
                'email_type': 'html',
                'email_address': user.email,
                'merge_fields': merge_fields,
                'status_if_new': 'subscribed',
            }),
        }
        operations.append(operation)

    result = kocherga.mailchimp.api_call('POST', 'batches', {
        'operations': operations
    })

    batch_id = result['id']

    kocherga.mailchimp.wait_for_batch(batch_id)
