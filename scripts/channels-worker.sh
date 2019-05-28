#!/bin/sh
exec ./manage.py runworker slack-notify events-slack-notify
