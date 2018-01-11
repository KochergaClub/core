#!/bin/sh
set -e
git push
ssh -A berekuk.ru 'cd /srv/kocherga-api && git pull && . ./venv/bin/activate && pip install -r ./requirements.txt && pip install -r ../kocherga-common/requirements.txt && sudo systemctl restart kocherga-api'
