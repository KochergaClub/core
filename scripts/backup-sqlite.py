#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import boto3
import logging

import kocherga.secrets
import kocherga.db
import kocherga.config

AWS_CONFIG = kocherga.secrets.json_secret('aws_credentials')
BUCKET_NAME = kocherga.config.config()['s3']['backups']

def main():
    logging.info('Backing up SQLite database...')

    s3 = boto3.session.Session(**AWS_CONFIG).client('s3')
    s3.upload_file(kocherga.db.DB_FILE, BUCKET_NAME, 'kocherga.db')
    logging.info('SQLite db backup successful')

main()
