#!/usr/bin/env python
import sys, pathlib, os.path
sys.path.append(
    os.path.abspath(
        str(pathlib.Path(__file__).parent.parent)
    )
)

import django
django.setup()

import fire

from kocherga.graphql.schema import load_all_typedefs


def main(out):
    with open(out, 'w') as fh:
        typedefs = load_all_typedefs()
        fh.write(typedefs)


if __name__ == '__main__':
    fire.Fire(main)
