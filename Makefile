install-dev:
	poetry install

dev:
	honcho start -f Procfile.dev

test-types:
	git submodule init
	MYPYPATH=stubs/local-stubs:stubs/sqlalchemy-stubs mypy --strict-optional --check-untyped-defs kocherga

test-code:
	pytest

lint:
	flake8 kocherga/ --max-line-length=120

release-quick:
	git push
	cd ../deploy && poetry run ansible-playbook ./kocherga.yml --tags core-quick

rq: release-quick

release:
	git push
	cd ../deploy && poetry run ansible-playbook ./kocherga.yml --tags core

test: test-types test-code

front:
	npx webpack --config ./webpack/front.config.js -p
	npx webpack --config ./webpack/back.config.js -p

base-image:
	docker build -t kocherga/code/core/base -f Dockerfile.base .

image:
	TOKEN=$$(cat ~/.npmrc | fgrep authToken | awk -F'"' '{print $$2}') && docker build --build-arg NPM_TOKEN=$${TOKEN} -t kocherga/code/core .
