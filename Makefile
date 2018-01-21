deploy:
	git push
	ssh -A berekuk.ru 'cd /srv/kocherga-api && git pull && make install-common && sudo systemctl restart kocherga-api'

install-common:
	python3 -mvenv venv
	. ./venv/bin/activate && pip install -r ./requirements.txt

install: install-common
	sudo cp systemd.service /etc/systemd/system/kocherga-api.service
	sudo systemctl enable --now kocherga-api
	sudo cp nginx.config /etc/nginx/sites-available/kocherga-api
	sudo ln -s /etc/nginx/sites-available/kocherga-api /etc/nginx/sites-enabled/kocherga-api
	sudo systemctl restart nginx

install-dev: install-common
	. ./venv/bin/activate && pip install -r ./requirements-dev.txt

dev:
	. ./venv/bin/activate && . ./env && JWT_SECRET_KEY=dev FLASK_APP=kocherga.api.app flask run

test:
	. ./venv/bin/activate && pytest
