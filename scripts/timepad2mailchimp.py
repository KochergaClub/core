#!/usr/bin/env python3
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import kocherga.events.timepad
import kocherga.email.lists

def main():
    timepad_subscribers = kocherga.events.timepad.get_all_subscribers()

    mailchimp_users = [
        kocherga.emails.list.User(
            first_name=s['first_name'],
            last_name=s['last_name'],
            email=s['email'],
        )
        for s in timepad_subscribers
    ]

    kocherga.email.lists.populate_main_list(mailchimp_users)

if __name__ == '__main__':
    main()
