import os
import os.path
import json

from kocherga.config import secrets_dir


def plain_secret(name):
    file = os.path.join(secrets_dir(), name)
    with open(file) as fh:
        return fh.read().strip()


def json_secret(name):
    file = os.path.join(secrets_dir(), name)
    return json.load(open(file))


def save_json_secret(data, name):
    file = os.path.join(secrets_dir(), name)
    json.dump(data, open(file, "w"))
