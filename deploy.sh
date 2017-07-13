#!/bin/sh
git push
ssh berekuk.ru 'cd /srv/kocherga-api && git pull && sudo restart kocherga-api'
