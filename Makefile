deploy:
	git push
	ssh -A api.kocherga.club 'cd /srv/kocherga-api && git pull && make install-common && sudo systemctl restart kocherga-api'

install-common:
  pipenv install

install: install-common
	sudo cp systemd.service /etc/systemd/system/kocherga-api.service
	sudo systemctl enable --now kocherga-api
	sudo cp nginx.config /etc/nginx/sites-available/kocherga-api
	sudo ln -s /etc/nginx/sites-available/kocherga-api /etc/nginx/sites-enabled/kocherga-api
	sudo systemctl restart nginx

install-dev: install-common
  pipenv install -d

dev:
	. ./env.example && QUART_APP=kocherga/api/app.py DEV=1 quart run

test:
	pytest
