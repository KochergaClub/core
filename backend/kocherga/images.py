import logging
logger = logging.getLogger(__name__)

from django.conf import settings

from pathlib import Path
import re
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
        self.main_dir = str(Path(self.directory) / "images")

        for d in (
            self.mailchimp_dir,
        ):
            if not Path(d).exists():
                Path(d).mkdir()

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
