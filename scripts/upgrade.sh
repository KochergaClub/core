#!/bin/sh
set -e
poetry run ./manage.py migrate
poetry run ./manage.py collectstatic --no-input
