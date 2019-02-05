#!/usr/bin/env python3
import sys, os.path
from pathlib import Path
sys.path.append(
    os.path.abspath(
        str(Path(__file__).parent.parent)
    )
)

import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kocherga.django.settings")
django.setup()

import kocherga.events.timepad
import kocherga.email.lists

def main():
    timepad_subscribers = kocherga.events.timepad.get_all_subscribers()

    mailchimp_users = [
        kocherga.email.lists.User(
            first_name=s['first_name'],
            last_name=s['last_name'],
            email=s['email'],
            card_id=None,
        )
        for s in timepad_subscribers
    ]

    kocherga.email.lists.populate_main_list(mailchimp_users)

if __name__ == '__main__':
    main()
