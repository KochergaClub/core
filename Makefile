install-dev:
	pipenv install -d

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
	cd ../deploy && pipenv run 'ansible-playbook ./kocherga.yml --tags core-quick'

rq: release-quick

release:
	git push
	cd ../deploy && pipenv run 'ansible-playbook ./kocherga.yml --tags core'

test: test-types test-code
