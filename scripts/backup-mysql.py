#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import boto3
import logging
import sys
from pathlib import Path
import subprocess

from django.conf import settings


def main():
    BUCKET_NAME = settings.KOCHERGA_BACKUPS_S3_BUCKET

    logging.info('Backing up MySQL database...')

    s3 = boto3.session.Session(
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    ).client('s3')

    tmp_dir = Path('/tmp') / 'mysql'
    tmp_dir.mkdir(exist_ok=True)

    DB = settings.DATABASES['default']
    tmp_file = tmp_dir / f"{DB['NAME']}.gz"

    logging.info(f"Backing up {DB['NAME']} to {tmp_file}")
    subprocess.run(
        f"mysqldump -u{DB['USER']} --password={DB['PASSWORD']} --host={DB['HOST']} {DB['NAME']} | gzip >{tmp_file}",
        shell=True,
        check=True
    )

    logging.info(f'Uploading {tmp_file} to S3')
    s3.upload_file(str(tmp_file), BUCKET_NAME, f"mysql/{DB['NAME']}.gz")
    logging.info(f'MySQL DB backup successful')


if __name__ == '__main__':
    import sys, os, django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kocherga.django.settings")
    django.setup()

    main()
