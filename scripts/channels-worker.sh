#!/bin/sh
exec poetry run ./manage.py runworker slack-notify
