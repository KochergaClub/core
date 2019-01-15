import logging
logger = logging.getLogger(__name__)

from django.conf import settings

from datetime import timedelta
from pathlib import Path
import re
import requests
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

        self.assets_dir = str(Path(self.directory) / "assets")
        self.mailchimp_dir = str(Path(self.directory) / "mailchimp")
        self.screenshot_dir = str(Path(self.directory) / "screenshot")
        self.main_dir = str(Path(self.directory) / "images")

        for d in (
            self.assets_dir,
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
        api_root = settings.KOCHERGA_API_ROOT
        r = requests.get(
            f"{api_root}/templater/mailchimp/png",
            params={
                "start_date": start_date.strftime("%Y-%m-%d"),
                "end_date": (start_date + timedelta(days=6)).strftime("%Y-%m-%d"),
            },
        )
        r.raise_for_status()
        return r.content

    def get_filename(self, key):
        re.match(r"^\w+$", key)
        return str(Path(self.main_dir) / f"{key}.jpg") # TODO - check for existence?

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
