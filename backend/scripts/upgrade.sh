#!/bin/sh
set -e

export PYTHONUNBUFFERED=1
./manage.py migrate
./manage.py collectstatic --no-input
