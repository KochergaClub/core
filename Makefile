export TOKEN=$(shell cat ~/.npmrc | fgrep authToken | awk -F'"' '{print $$2}')

image:
		docker build -f docker/Dockerfile --build-arg NPM_TOKEN=$$TOKEN -t registry.gitlab.com/kocherga/code/core:dev .

##### Dev environment #####
init-dev:
	docker-compose -f docker/compose.dev.yml exec db mysql -uroot -e 'CREATE DATABASE kocherga'
	docker-compose -f docker/compose.dev.yml run api poetry run ./manage.py migrate

dev: image
	docker-compose -f docker/compose.dev.yml up

dev-full: image
	docker-compose -f docker/compose.dev.yml -f docker/compose.dev-extra.yml up

##### Tests #####
test-types:
	git submodule init
	MYPYPATH=stubs/local-stubs:stubs/sqlalchemy-stubs poetry run mypy --strict-optional --check-untyped-defs kocherga # FIXME

test-code:
	docker-compose -f docker/compose.dev.yml run api poetry run pytest

lint:
	poetry run flake8 kocherga/ --max-line-length=120

test: test-types test-code lint

##### Helper commands #####
dbshell:
	docker-compose -f docker/compose.dev.yml exec db mysql kocherga
