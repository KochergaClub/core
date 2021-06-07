#!/usr/bin/env python3
import sys, pathlib, os.path

sys.path.append(os.path.abspath(str(pathlib.Path(__file__).parent.parent)))

import django

django.setup()

import fire

import graphql
from kocherga.graphql.schema import schema


def main(out):
    with open(out, 'w') as fh:
        fh.write(graphql.print_schema(schema))


if __name__ == '__main__':
    fire.Fire(main)
