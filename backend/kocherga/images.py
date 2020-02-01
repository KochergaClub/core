import logging
logger = logging.getLogger(__name__)

from django.conf import settings

from datetime import timedelta
from pathlib import Path
import re
import asyncio
import kocherga.templater.models
import hashlib
import os.path

import locale
locale.setlocale(locale.LC_TIME, locale.normalize("ru"))


class ImageStorage:

    def __init__(self, directory):
        self.set_directory(directory)

    # used in tests
    def set_directory(self, directory):
        self.directory = directory

        if not Path(self.directory).exists():
            Path(self.directory).mkdir()

        self.mailchimp_dir = str(Path(self.directory) / "mailchimp")
        self.screenshot_dir = str(Path(self.directory) / "screenshot")
        self.main_dir = str(Path(self.directory) / "images")

        for d in (
            self.mailchimp_dir,
            self.screenshot_dir,
        ):
            if not Path(d).exists():
                Path(d).mkdir()

    def save_screenshot(self, name, image_bytes):
        filename = Path(self.screenshot_dir) / name
        with open(filename, "wb") as fh:
            fh.write(image_bytes)
        return filename

    def screenshot_file(self, name):
        return str(Path(self.screenshot_dir) / name)

    def schedule_file(self, start_date):
        image_file = Path(self.mailchimp_dir) / f"{start_date:%Y-%m-%d}.png"

        if not image_file.is_file():
            image_bytes = self.create_mailchimp_image(start_date)
            with open(image_file, "wb") as fh:
                fh.write(image_bytes)

        return str(image_file)

    def create_mailchimp_image(self, start_date):
        params = {
            "start_date": start_date.strftime("%Y-%m-%d"),
            "end_date": (start_date + timedelta(days=6)).strftime("%Y-%m-%d"),
        }
        template = kocherga.templater.models.Template.by_name('mailchimp')
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        image_bytes = loop.run_until_complete(template.generate_png(params))
        return image_bytes

    def get_filename(self, key):
        re.match(r"^\w+$", key)
        # TODO - check for existence?
        return str(Path(self.main_dir) / f"{key}.jpg")

    def add_file(self, fh_in):
        bytes = fh_in.read()

        key = hashlib.md5(bytes).hexdigest()
        logger.info(f'Saving image with key {key}')

        with open(self.get_filename(key), "wb") as fh_out:
            fh_out.write(bytes)

        return key


def init_global_image_storage():
    return ImageStorage(os.path.join(settings.DATA_DIR, 'upload'))


image_storage = init_global_image_storage()
