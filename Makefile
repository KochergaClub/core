dev: image
	TOKEN=$$(cat ~/.npmrc | fgrep authToken | awk -F'"' '{print $$2}') docker-compose -f docker-compose.dev.yml up

test-types:
	git submodule init
	MYPYPATH=stubs/local-stubs:stubs/sqlalchemy-stubs poetry run mypy --strict-optional --check-untyped-defs kocherga

test-code:
	poetry run pytest

lint:
	poetry run flake8 kocherga/ --max-line-length=120

test: test-types test-code lint

front:
	npx webpack --config ./webpack/front.config.js -p
	npx webpack --config ./webpack/back.config.js -p

image:
	TOKEN=$$(cat ~/.npmrc | fgrep authToken | awk -F'"' '{print $$2}') \
		&& docker build --build-arg NPM_TOKEN=$${TOKEN} -t registry.gitlab.com/kocherga/code/core:dev .
