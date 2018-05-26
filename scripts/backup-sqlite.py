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
    logging.info('Nothing to do here.')

if __name__ == '__main__':
    main()
