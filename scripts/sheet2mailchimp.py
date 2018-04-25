#!/usr/bin/env python3
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import json
import requests
import hashlib

import kocherga.google
import kocherga.secrets

LIST_ID = '8b43e3793e'
MAILCHIMP_API = 'https://us11.api.mailchimp.com/3.0'
MAILCHIMP_API_KEY = kocherga.secrets.plain_secret('mailchimp_api_key')

def api_call(method, url, data={}):
    if method == 'GET':
        r = requests.get(
            f'{MAILCHIMP_API}/{url}',
            headers={
                'Authorization': f'apikey {MAILCHIMP_API_KEY}',
            }
        )
    elif method == 'POST':
        r = requests.post(
            f'{MAILCHIMP_API}/{url}',
            headers={
                'Authorization': f'apikey {MAILCHIMP_API_KEY}',
                'Content-Type': 'application/json',
            },
            data=json.dumps(data),
        )
    elif method == 'PUT':
        # copy-pasted!
        r = requests.put(
            f'{MAILCHIMP_API}/{url}',
            headers={
                'Authorization': f'apikey {MAILCHIMP_API_KEY}',
                'Content-Type': 'application/json',
            },
            data=json.dumps(data),
        )
    else:
        raise Exception(f'Unknown method {method}')

    r.raise_for_status()
    return r.json()

def get_date_group_category():
    response = api_call('GET', f'lists/{LIST_ID}/interest-categories')
    category = next(c for c in response['categories'] if c['title'] == 'Дата воркшопа')
    return category

def get_all_dates(category_id):
    response = api_call('GET', f'lists/{LIST_ID}/interest-categories/{date_group_id}/interests')
    print(response)

def create_new_date(category_id, event_type, event_id):
    event_type_ru = {
        'workshop': 'Воркшоп',
        '3week': 'Трехнедельный курс'
    }[event_type]

    response = api_call(
        'POST',
        f'lists/{LIST_ID}/interest-categories/{category_id}/interests',
        { 'name': f'{event_type_ru} {event_id}' }
    )
    return response['id']

def import_user(user, group_id):
    md5 = hashlib.md5(user['email'].lower().encode()).hexdigest()
    response = api_call(
        'PUT',
        f'lists/{LIST_ID}/members/{md5}',
        {
            'email_type': 'html',
            'email_address': user['email'],
            'merge_fields': {
                'FNAME': user['first_name'],
                'LNAME': user['last_name'],
            },
            'interests': {
                group_id: True,
            },
            'status_if_new': 'subscribed',
        }
    )
    return response['id']

def get_users(event_type, event_id):
    gc = kocherga.google.gspread_client()

    event_type_ru = {
        'workshop': 'Воркшоп',
        '3week': 'Курс'
    }[event_type]

    spreadsheet = gc.open_by_key('1mj-YsVklLtlFfy_04lZ5a0NX85iZ3O_IxsUehBeJiFg')
    worksheet = spreadsheet.worksheet(f'{event_type_ru} {event_id}')

    rows = worksheet.get_all_records()

    return [
        {
            'email': row['Емейл'],
            'first_name': row['Имя'],
            'last_name': row['Фамилия'],
        }
        for row in rows
    ]

def main():
    category = get_date_group_category()
    event_type = 'workshop'
    event_id = '2018-04'
    group_id = create_new_date(category['id'], event_type, event_id)
    #group_id = '5144f74e10'

    users = get_users(event_type, event_id)
    for user in users:
        import_user(user, group_id)
        print(f'Added {user["email"]}')

if __name__ == '__main__':
    main()
