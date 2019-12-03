#!/bin/sh
set -e
./manage.py migrate
./manage.py collectstatic --no-input
