deploy:
	git push
	ssh -A berekuk.ru 'cd /srv/kocherga-api && git pull && . ./venv/bin/activate && pip install -r ./requirements.txt && pip install -r ../kocherga-common/requirements.txt && sudo systemctl restart kocherga-api'

install:
	pyvenv ./venv
	. ./venv/bin/activate && pip install -r ./requirements.txt
	sudo cp systemd.service /etc/systemd/system/kocherga-api.service
	sudo systemctl enable --now kocherga-api
	sudo cp nginx.config /etc/nginx/sites-available/kocherga-api
	sudo ln -s /etc/nginx/sites-available/kocherga-api /etc/nginx/sites-enabled/kocherga-api
	sudo systemctl restart nginx

dev:
	. ./venv/bin/activate && . ./env && PYTHONPATH=../kocherga-common:. JWT_SECRET_KEY=dev FLASK_APP=kocherga.api.app flask run

test:
	. ./venv/bin/activate && PYTHONPATH=../kocherga-common:. pytest
