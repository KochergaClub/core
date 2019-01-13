install-dev:
	pipenv install -d

dev:
	. ./env.example && ./manage.py runserver

ludwig:
	TIER=dev ./scripts/ludwig.py

ludwig-lt:
	lt --port 5200 --subdomain kocherga-dev

test-types:
	git submodule init
	MYPYPATH=stubs/local-stubs:stubs/sqlalchemy-stubs mypy --strict-optional --check-untyped-defs kocherga

test-code:
	pytest

release-quick:
	git push
	cd ../deploy && pipenv run 'ansible-playbook ./kocherga.yml --tags core-quick'

rq: release-quick

release:
	git push
	cd ../deploy && pipenv run 'ansible-playbook ./kocherga.yml --tags core'

test: test-types test-code
