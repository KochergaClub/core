import json
import hashlib
from collections import namedtuple

from typing import List

import kocherga.mailchimp

User = namedtuple("User", "email first_name last_name card_id")


def get_interest_category_id():
    return kocherga.mailchimp.interest_category_by_name('Подписки')['id']


def get_all_interests():
    LIST_ID = kocherga.mailchimp.MAIN_LIST_ID
    return kocherga.mailchimp.api_call(
        'GET',
        f"lists/{LIST_ID}/interest-categories/{get_interest_category_id()}/interests"
    )['interests']


def populate_main_list(users: List[User]):
    LIST_ID = kocherga.mailchimp.MAIN_LIST_ID

    operations = []
    for user in users:
        merge_fields = {
            'FNAME': user.first_name or '',
            'LNAME': user.last_name or '',
        }
        if user.card_id:
            merge_fields['CARD_ID'] = user.card_id
            merge_fields['HAS_CARD'] = 'True'

        subscriber_hash = hashlib.md5(user.email.lower().encode()).hexdigest()

        add_operation = {
            'method': 'POST',
            'path': f'lists/{LIST_ID}/members/{subscriber_hash}',
            'body': json.dumps({
                'email_type': 'html',
                'email_address': user.email,
                'merge_fields': merge_fields,
                'interests': {
                    k['id']: True
                    for k in get_all_interests()
                },
            }),
        }
        update_operation = {
            'method': 'PATCH',
            'path': f'lists/{LIST_ID}/members/{subscriber_hash}',
            'body': json.dumps({
                'email_type': 'html',
                'email_address': user.email,
                'merge_fields': merge_fields,
                # Note that we update merge fields (i.e. cafe-manager's CARD_ID), but not interests,
                # because users can update those on their own.
            }),
        }
        operations.append(add_operation)
        operations.append(update_operation)

    result = kocherga.mailchimp.api_call('POST', 'batches', {
        'operations': operations
    })

    batch_id = result['id']

    kocherga.mailchimp.wait_for_batch(batch_id)
