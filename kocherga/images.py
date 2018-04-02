from datetime import timedelta
from pathlib import Path
import re
import requests

import kocherga.config

import locale
locale.setlocale(locale.LC_TIME, locale.normalize('ru'))

class ImageStorage:
    def __init__(self, directory):
        self.set_directory(directory)

    # used in tests
    def set_directory(self, directory):
        self.directory = directory

        self.assets_dir = str(Path(self.directory) / 'assets')
        self.event_dir = str(Path(self.directory) / 'event_image')
        self.mailchimp_dir = str(Path(self.directory) / 'mailchimp')
        self.screenshot_dir = str(Path(self.directory) / 'screenshot')

        for d in (self.assets_dir, self.event_dir, self.mailchimp_dir, self.screenshot_dir):
            if not Path(d).exists():
                Path(d).mkdir()

    def save_screenshot(self, name, image_bytes):
        filename = Path(self.screenshot_dir) / name
        with open(filename, 'wb') as fh:
            fh.write(image_bytes)
        return filename

    def screenshot_file(self, name):
        return str(Path(self.screenshot_dir) / name)

    def event_image_file(self, event_id, image_type):
        re.match(r'^\w+$', image_type)
        re.match(r'^\w+$', event_id)
        return str(Path(self.event_dir) / f'{image_type}.{event_id}.jpg')

    def schedule_file(self, start_date):
        image_file = Path(self.mailchimp_dir) / f'{start_date:%Y-%m-%d}.png'

        if not image_file.is_file():
            image_bytes = self.create_mailchimp_image(start_date)
            with open(image_file, 'wb') as fh:
                fh.write(image_bytes)

        return str(image_file)

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

def init_global_image_storage():
    return ImageStorage(kocherga.config.image_storage_dir())

image_storage = init_global_image_storage()
