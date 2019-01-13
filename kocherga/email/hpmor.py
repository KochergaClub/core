import requests
import hashlib
import json

import kocherga.mailchimp

URL = 'https://audd.io/hpmor/api/?action=get_subscribed'

def import_all():
    LIST_ID = kocherga.mailchimp.MAIN_LIST_ID

    interests = kocherga.mailchimp.api_call('GET', f"lists/{LIST_ID}/interest-categories/861f3cb880/interests")
    news_interest = next(i for i in interests['interests'] if i['name'] == 'Материалы и новости')['id']

    r = requests.get(URL)
    r.raise_for_status()

    operations = []
    for item in r.json():
        email = item['email']

        if ' ' in item['name']:
            parts = item['name'].split(' ')
            last_name = parts[0]
            first_name = parts[1]
        else:
            last_name = ''
            first_name = item['name']
        print(first_name, last_name, email)

        merge_fields = {
            'FNAME': first_name or '',
            'LNAME': last_name or '',
        }

        subscriber_hash = hashlib.md5(email.lower().encode()).hexdigest()
        operations.append({
            'method': 'PUT',
            'path': f'lists/{LIST_ID}/members/{subscriber_hash}',
            'body': json.dumps({
                'email_type': 'html',
                'email_address': email,
                'merge_fields': merge_fields,
                'interests': {
                    news_interest: True,
                },
                'status_if_new': 'subscribed',
            }),
        })

        operations.append({
            'method': 'POST',
            'path': f'lists/{LIST_ID}/members/{subscriber_hash}/tags',
            'body': json.dumps({
                'tags': [
                    {
                        'name': 'Краудфандинг ГПиМРМ',
                        'status': 'active',
                    }
                ]
            }),
        })

    result = kocherga.mailchimp.api_call('POST', 'batches', {
        'operations': operations
    })

    batch_id = result['id']

    kocherga.mailchimp.wait_for_batch(batch_id)
