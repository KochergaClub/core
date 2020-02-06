#!/bin/sh

if [ -z "$S3_BACKUP_BUCKET" ]; then
    echo "S3_BACKUP_BUCKET is not set"
    exit 1
fi

if [ -z "$DB_PASSWORD" ]; then
    echo "DB_PASSWORD is not set"
    exit 1
fi

TMP_FILE=/tmp/all-databases.gz

set -e
mysqldump --host=kocherga-mysql --user=kocherga --password=$DB_PASSWORD kocherga | gzip >$TMP_FILE

aws s3 cp $TMP_FILE s3://$S3_BACKUP_BUCKET/kocherga-mysql/$(date -Idate).gz
