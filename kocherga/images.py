from datetime import timedelta
import os.path
import re
import requests

import kocherga.config

import locale
locale.setlocale(locale.LC_TIME, locale.normalize('ru'))

class ImageStorage:
    def __init__(self, directory):
        self.directory = directory

        self.assets_dir = os.path.join(self.directory, 'assets')
        self.event_dir = os.path.join(self.directory, 'event_image')
        self.mailchimp_dir = os.path.join(self.directory, 'mailchimp')

        for d in (self.assets_dir, self.event_dir, self.mailchimp_dir):
            if not os.path.exists(d):
                os.mkdir(d)

    def event_image_file(self, event_id, image_type):
        re.match(r'^\w+$', image_type)
        re.match(r'^\w+$', event_id)
        return os.path.join(self.event_dir, '{}.{}.jpg'.format(image_type, event_id))

    def schedule_file(self, start_date):
        filename = os.path.join(self.mailchimp_dir, '{}.png'.format(start_date.strftime('%Y-%m-%d')))
        print(filename)

        if not os.path.isfile(filename):
            image_bytes = self.create_mailchimp_image(start_date)
            with open(filename, 'w') as fh:
                fh.write(image_bytes)

        return filename

    def create_mailchimp_image(self, start_date):
        web_root = kocherga.config.web_root()
        r = requests.get(
            f'{web_root}/templater/png/mailchimp',
            params={
                'start_date': start_date.strftime('%Y-%m-%d'),
                'end_date': (start_date + timedelta(days=6)).strftime('%Y-%m-%d'),
            }
        )
        r.raise_for_status()
        return r.content

image_storage = ImageStorage(kocherga.config.image_storage_dir())
