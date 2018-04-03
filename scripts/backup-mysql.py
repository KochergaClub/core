#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import boto3
import logging
import sys
from pathlib import Path
import subprocess

import kocherga.secrets
import kocherga.db
import kocherga.config

AWS_CONFIG = kocherga.secrets.json_secret('aws_credentials')
BUCKET_NAME = kocherga.config.config()['s3']['backups']

def main():
    logging.info('Backing up MySQL databases...')

    s3 = boto3.session.Session(**AWS_CONFIG).client('s3')

    tmp_dir = Path('/tmp') / 'mysql'
    tmp_dir.mkdir(exist_ok=True)

    for db_name in sys.argv[1:]:
        tmp_file = tmp_dir / f'{db_name}.gz'

        logging.info(f'Backing up {db_name} to {tmp_file}')
        subprocess.run(f'mysqldump {db_name} | gzip >{tmp_file}', shell=True, check=True)

        logging.info(f'Uploading {tmp_file} to S3')
        s3.upload_file(kocherga.db.DB_FILE, BUCKET_NAME, f'mysql/{tmp_file}')
        logging.info(f'MySQL DB {db_name} backup successful')

main()
