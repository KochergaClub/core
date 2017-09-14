#!/bin/sh
set -e

pyvenv ./venv
. ./venv/bin/activate
pip install -r ./requirements.txt
sudo cp systemd.service /etc/systemd/system/kocherga-api.service
sudo systemctl enable --now kocherga-api
sudo cp nginx.config /etc/nginx/sites-available/kocherga-api
sudo ln -s /etc/nginx/sites-available/kocherga-api /etc/nginx/sites-enabled/kocherga-api
sudo systemctl restart nginx
