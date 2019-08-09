export TOKEN=$(shell cat ~/.npmrc | fgrep authToken | awk -F'"' '{print $$2}')

image:
		docker build -f docker/Dockerfile --build-arg NPM_TOKEN=$$TOKEN -t registry.gitlab.com/kocherga/core:dev .

##### Dev environment #####
init-dev:
	docker-compose -f docker/compose.dev.yml exec db mysql -uroot -e 'CREATE DATABASE kocherga'
	docker-compose -f docker/compose.dev.yml run --rm api ./manage.py migrate
	docker-compose -f docker/compose.dev.yml run --rm api npm ci

dev-mac: image
	docker-sync-stack start

dev: image
	docker-compose -f docker/compose.dev.yml up

dev-full: image
	docker-compose -f docker/compose.dev.yml -f docker/compose.dev-extra.yml up

##### Tests #####
test-types:
	git submodule init
	MYPYPATH=stubs/local-stubs:stubs/sqlalchemy-stubs docker-compose -f docker/compose.dev.yml run --rm api mypy --strict-optional --check-untyped-defs kocherga # FIXME

test-code:
	docker-compose -f docker/compose.dev.yml run --rm api pytest

lint:
	docker-compose -f docker/compose.dev.yml run --rm api flake8 kocherga/ --max-line-length=120

eslint:
	docker-compose -f docker/compose.dev.yml run --rm api npx eslint jsx --ext ts,tsx

test-js:
	docker-compose -f docker/compose.dev.yml run --rm api npx tsc
	docker-compose -f docker/compose.dev.yml run --rm api npx jest

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
	for c in render-server webpack_front webpack_back; do docker exec -it docker_$${c}_1 npm i; done
