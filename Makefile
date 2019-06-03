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

test-js:
	docker-compose -f docker/compose.dev.yml run --rm api npx tsc
	docker-compose -f docker/compose.dev.yml run --rm api npx jest

test: test-types test-code test-js lint

##### Helper commands #####
dbshell:
	docker-compose -f docker/compose.dev.yml exec db mysql kocherga

shell:
	docker-compose -f docker/compose.dev.yml exec api bash

pyshell:
	docker-compose -f docker/compose.dev.yml exec api ./manage.py shell
