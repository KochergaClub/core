import base64
import uuid

from django.db import models


def generate_uuid():
    return base64.b32encode(uuid.uuid4().bytes)[:26].lower().decode('ascii')


class ShortUUIDField(models.SlugField):
    def __init__(self, *args, **kwargs):
        kwargs['default'] = generate_uuid
        kwargs['unique'] = True
        super().__init__(*args, **kwargs)
