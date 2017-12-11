#!/bin/sh
set -e
git push
ssh -A berekuk.ru 'cd /srv/kocherga-api && git pull && sudo systemctl restart kocherga-api'
