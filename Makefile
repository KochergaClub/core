export TOKEN=$(shell cat ~/.npmrc | fgrep authToken | awk -F'"' '{print $$2}')

image:
		docker build -f docker/Dockerfile --build-arg NPM_TOKEN=$$TOKEN -t registry.gitlab.com/kocherga/core:dev .

##### Dev environment #####
init-dev:
	docker-compose -f docker/compose.dev.yml run --rm api ./manage.py migrate

dev-mixed: image
	nf start -j ./docker/Procfile.mixed

dev-mac: image
	docker-sync-stack start

dev: image
	docker-compose -f docker/compose.dev.yml up

dev-full: image
	docker-compose -f docker/compose.dev.yml -f docker/compose.dev-extra.yml up

##### Tests #####
test-types:
	git submodule init
	MYPYPATH=stubs/local-stubs:stubs/sqlalchemy-stubs docker-compose -f docker/compose.dev.yml exec api mypy --strict-optional --check-untyped-defs kocherga # FIXME

test-code:
	docker-compose -f docker/compose.dev.yml exec api pytest

lint:
	docker-compose -f docker/compose.dev.yml exec api flake8 kocherga/ --max-line-length=120

eslint:
	docker-compose -f docker/compose.dev.yml exec api npx eslint jsx --ext ts,tsx

test-js:
	docker-compose -f docker/compose.dev.yml exec api npx tsc
	docker-compose -f docker/compose.dev.yml exec api npx jest

test: test-types test-code test-js lint eslint

##### Helper commands #####
dbshell:
	docker-compose -f docker/compose.dev.yml exec db mysql kocherga

shell:
	docker-compose -f docker/compose.dev.yml exec api bash

pyshell:
	docker-compose -f docker/compose.dev.yml exec api ./manage.py shell

deploy_prod_secrets:
	scp kocherga/django/settings/prod_secrets.py kocherga.club: && ssh kocherga.club 'sudo mv prod_secrets.py /config/secrets.py && sudo chown root:root /config/secrets.py && sudo chmod 600 /config/secrets.py'

update_npm_packages:
	docker cp package.json docker_render-server_1:/code/package.json
	docker cp package-lock.json docker_render-server_1:/code/package-lock.json
	docker exec -it docker_render-server_1 npm i
	docker restart docker_render-server_1

shapes:
	docker-compose -f docker/compose.dev.yml exec api ./scripts/generate-frontend-shapes.py

kassa_localtunnel:
	npx lt --port 8000 --subdomain kassa --host https://lt.berekuk.ru

update_requirements:
	docker cp requirements.in docker_api_1:/code/requirements.in
	docker-compose -f docker/compose.dev.yml exec api pip-compile
	docker cp docker_api_1:/code/requirements.txt ./requirements.txt
