#!/usr/bin/env python3
import os.path
import pathlib
import sys

sys.path.append(os.path.abspath(str(pathlib.Path(__file__).parent.parent)))

import logging

logger = logging.getLogger(__name__)

import django

django.setup()

import kocherga.email.channels
import kocherga.events.channels
import kocherga.ratio.channels
import kocherga.slack.channels
from channels.layers import get_channel_layer
from channels.routing import get_default_application
from channels.worker import Worker


def main():
    channel_names = []
    for workers in (
        kocherga.events.channels.workers,
        kocherga.slack.channels.workers,
        kocherga.ratio.channels.workers,
        kocherga.email.channels.workers,
    ):
        channel_names += workers.keys()

    logger.info(f"Starting worker for channels {channel_names}")
    Worker(
        application=get_default_application(),
        channels=channel_names,
        channel_layer=get_channel_layer(),
    ).run()


if __name__ == '__main__':
    main()
