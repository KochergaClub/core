##### Dev environment #####
dev:
	kubectl delete job core-django-migrate || true
	skaffold dev --port-forward

##### Tests #####
test-types:
	git submodule init
	MYPYPATH=stubs/local-stubs:stubs/sqlalchemy-stubs docker-compose -f docker/compose.dev.yml exec api mypy --strict-optional --check-untyped-defs kocherga # FIXME

test-code:
	docker-compose -f docker/compose.dev.yml exec api pytest

lint:
	docker-compose -f docker/compose.dev.yml exec api flake8 kocherga/ --max-line-length=120

eslint:
	docker-compose -f docker/compose.dev.yml exec api npx eslint src --ext ts,tsx

test-js:
	docker-compose -f docker/compose.dev.yml exec api npx tsc
	docker-compose -f docker/compose.dev.yml exec api npx jest

test: test-types test-code test-js lint eslint

runserver:
# This target is for testing runserver exceptions only (which are not displayed in docker logs, unfortunately).
# Use `make dev` or `make dev-mac` for actually running the app.
	docker-compose -f docker/compose.dev.yml exec api ./manage.py runserver

##### Helper commands #####
dbshell:
	kubectl exec --context=dev -it $(shell kubectl --context=dev get po -l app=core-mysql -o name) -- bash -c 'mysql -p$$MYSQL_ROOT_PASSWORD kocherga'

shell:
	kubectl exec --context=dev -it $(shell kubectl --context=dev get po -l app=core-django -o name) bash

pyshell:
	kubectl exec --context=dev -it $(shell kubectl --context=dev get po -l app=core-django -o name) ./manage.py shell

deploy_prod_secrets:
	scp backend/kocherga/django/settings/prod_secrets.py kocherga.club:
	ssh kocherga.club 'sudo mv prod_secrets.py /config/secrets.py && sudo chown root:root /config/secrets.py && sudo chmod 600 /config/secrets.py'
	ssh kocherga.club 'docker restart docker_api_1'

update_npm_packages:
	docker cp frontend/package.json docker_render-server_1:/code/package.json
	docker cp frontend/package-lock.json docker_render-server_1:/code/package-lock.json
	docker exec -it docker_render-server_1 npm i
	docker restart docker_render-server_1

shapes:
	docker-compose -f docker/compose.dev.yml exec api ./scripts/generate-frontend-shapes.py
	docker cp docker_api_1:/tmp/shapes.ts ./frontend/src/shapes.ts

graphql:
	cd frontend && npx graphql-codegen

kassa_localtunnel:
	npx lt --port 8000 --subdomain kassa --host https://lt.berekuk.ru

update_requirements:
	kubectl cp --context=dev backend/requirements.in $(shell kubectl --context=dev get po -l app=core-django -o name | awk -F "/" '{print $$2}'):/code/requirements.in
	kubectl exec --context=dev $(shell kubectl --context=dev get po -l app=core-django -o name | awk -F "/" '{print $$2}') pip-compile
	kubectl exec --context=dev $(shell kubectl --context=dev get po -l app=core-django -o name | awk -F "/" '{print $$2}') pip-sync
	kubectl cp --context=dev $(shell kubectl --context=dev get po -l app=core-django -o name | awk -F "/" '{print $$2}'):/code/requirements.txt ./backend/requirements.txt

update_schema:
	kubectl exec --context=dev $(shell kubectl --context=dev get po -l app=core-django -o name | awk -F "/" '{print $$2}') ./scripts/export-schema.py schema.graphql
	kubectl cp --context=dev $(shell kubectl --context=dev get po -l app=core-django -o name | awk -F "/" '{print $$2}'):/code/schema.graphql ./schema.graphql

update_types:
	cd frontend && gql-gen
