#!/bin/sh

if [ -z "$S3_BACKUP_BUCKET" ]; then
    echo "S3_BACKUP_BUCKET is not set"
    exit 1
fi

if [ -z "$S3_PATH" ]; then
    echo "S3_PATH is not set"
    exit 1
fi

if [ -z "$DB_HOST" ]; then
    echo "DB_HOST is not set"
    exit 1
fi

if [ -z "$DB_USER" ]; then
    echo "DB_USER is not set"
    exit 1
fi

if [ -z "$DB_PASSWORD" ]; then
    echo "DB_PASSWORD is not set"
    exit 1
fi

if [ -z "$DB_NAME" ]; then
    echo "DB_NAME is not set"
    exit 1
fi


TMP_FILE=/tmp/dump.gz

set -e
mysqldump --host=$DB_HOST --user=$DB_USER --password=$DB_PASSWORD $DB_NAME | gzip >$TMP_FILE

aws s3 cp $TMP_FILE s3://$S3_BACKUP_BUCKET/$S3_PATH/$(date -Idate).gz
