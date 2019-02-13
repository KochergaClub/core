#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import boto3
import logging
import sys
from pathlib import Path
import subprocess

from django.conf import settings

MYSQL_ROOT_PASSWORD='' # FIXME

def main():
    AWS_CONFIG = settings.KOCHERGA_BACKUPS_AWS_CREDENTIALS
    BUCKET_NAME = settings.KOCHERGA_BACKUPS_S3_BUCKET

    logging.info('Backing up MySQL databases...')

    s3 = boto3.session.Session(**AWS_CONFIG).client('s3')

    tmp_dir = Path('/tmp') / 'mysql'
    tmp_dir.mkdir(exist_ok=True)

    for db_name in sys.argv[1:]:
        tmp_file = tmp_dir / f'{db_name}.gz'

        logging.info(f'Backing up {db_name} to {tmp_file}')
        subprocess.run(f'mysqldump -uroot --password={MYSQL_ROOT_PASSWORD} {db_name} | gzip >{tmp_file}', shell=True, check=True)

        logging.info(f'Uploading {tmp_file} to S3')
        s3.upload_file(str(tmp_file), BUCKET_NAME, f'mysql/{db_name}.gz')
        logging.info(f'MySQL DB {db_name} backup successful')

if __name__ == '__main__':
    import sys, os, django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kocherga.django.settings")
    django.setup()

    main()
