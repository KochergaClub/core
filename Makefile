deploy:
	git push
	ssh -A api.kocherga.club 'cd /srv/kocherga-api && git pull && make install-common && sudo systemctl restart kocherga-api'

install-dev:
	pipenv install -d

dev:
	. ./env.example && QUART_APP=kocherga/api/app.py DEV=1 quart run

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
