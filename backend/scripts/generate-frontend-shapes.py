#!/usr/bin/env python
import sys, pathlib, os.path
sys.path.append(
    os.path.abspath(
        str(pathlib.Path(__file__).parent.parent)
    )
)

import django
django.setup()

from kocherga.django.shapes_generator import generate_shapes


if __name__ == '__main__':
    generate_shapes()
