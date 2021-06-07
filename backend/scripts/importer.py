#!/usr/bin/env python3
import sys, pathlib, os.path
sys.path.append(
    os.path.abspath(
        str(pathlib.Path(__file__).parent.parent)
    )
)

from prometheus_client import start_http_server

import fire

import kocherga.importer.daemon


def main(name=None):
    start_http_server(8000)

    if name:
        kocherga.importer.daemon.run_one(name)
    else:
        kocherga.importer.daemon.run()


if __name__ == '__main__':
    import django
    django.setup()

    fire.Fire(main)
