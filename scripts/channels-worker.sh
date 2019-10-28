#!/bin/sh
exec ./manage.py runworker slack-notify events-slack-notify events-google-export mailchimp-subscribe
