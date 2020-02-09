#!/bin/sh

set -e

cd /tmp
/usr/bin/curl -L https://github.com/$REPO/archive/$RELEASE.tar.gz | /bin/tar xz
cd -
mv /tmp/$SRC extensions/$NAME
