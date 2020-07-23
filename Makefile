CLUSTER ?= dev
K = kubectl --context=$(CLUSTER)
KDEV = kubectl --context=dev  # for cases where we never want to affect prod by mistake

SUPERUSER_EMAIL ?= me@berekuk.ru

##### Dev environment #####
dev:
	kubectl --context=dev delete job core-django-migrate || true
	# see: https://github.com/GoogleContainerTools/skaffold/issues/3798, "Consider defaulting 'force' to false with Helm v3"
	skaffold dev --force=false

wait_for_migrate:
	@echo Waiting for migrate
	$(K) wait --for=condition=complete job/core-django-migrate --timeout=1h

dev_init: wait_for_migrate superuser wagtail_init restart_backend proxy
	echo OK

##### Tests #####
test-types:
	git submodule init
	MYPYPATH=stubs/local-stubs:stubs/sqlalchemy-stubs docker-compose -f docker/compose.dev.yml exec api mypy --strict-optional --check-untyped-defs kocherga # FIXME

test-code:
	$(K) exec -it $(shell $(K) get po -l app=core-django -o name) -- pytest

lint:
	$(K) exec -it $(shell $(K) get po -l app=core-django -o name) -- flake8 kocherga/

eslint:
	$(K) exec -it $(shell $(K) get po -l app=core-frontend -o name) -- npx eslint src --ext ts,tsx

test-js:
	$(K) exec -it $(shell $(K) get po -l app=core-frontend -o name) -- npx tsc
	$(K) exec -it $(shell $(K) get po -l app=core-frontend -o name) -- npx jest

test: test-types test-code test-js lint eslint

runserver:
# This target is for testing runserver exceptions only (which are not displayed in docker logs, unfortunately).
# Use `make dev` or `make dev-mac` for actually running the app.
	docker-compose -f docker/compose.dev.yml exec api ./manage.py runserver

##### Helper commands #####
dbshell:
	$(K) exec -it $(shell $(K) get po -l app=core-mysql -o name) -- bash -c 'mysql -p$$MYSQL_ROOT_PASSWORD kocherga'

shell:
	$(K) exec -it $(shell $(K) get po -l app=core-django -o name) -- bash

shell_front:
	$(K) exec -it $(shell $(K) get po -l app=core-frontend -o name) -- bash

shell_db:
	$(K) exec -it $(shell $(K) get po -l app=core-mysql -o name) -- bash

pyshell:
	$(K) exec -it $(shell $(K) get po -l app=core-django -o name) -- ./manage.py shell

tail:
	$(K) logs -f -l app=core-django

tail_front:
	$(K) logs -f -l app=core-frontend -c default

superuser:
	$(K) exec -it $(shell $(K) get po -l app=core-django -o name) -- ./manage.py createsuperuser --email=$(SUPERUSER_EMAIL)

proxy:
	$(K) port-forward svc/core-frontend 8000:80

deploy_prod_secrets:
	echo TODO
# scp backend/kocherga/django/settings/prod_secrets.py kocherga.club:
# ssh kocherga.club 'sudo mv prod_secrets.py /config/secrets.py && sudo chown root:root /config/secrets.py && sudo chmod 600 /config/secrets.py'
# ssh kocherga.club 'docker restart docker_api_1'

update_npm_packages:
	echo TODO
# docker cp frontend/package.json docker_render-server_1:/code/package.json
# docker cp frontend/package-lock.json docker_render-server_1:/code/package-lock.json
# docker exec -it docker_render-server_1 npm i
# docker restart docker_render-server_1

shapes:
	echo TODO
# docker-compose -f docker/compose.dev.yml exec api ./scripts/generate-frontend-shapes.py
# docker cp docker_api_1:/tmp/shapes.ts ./frontend/src/shapes.ts

graphql:
	cd frontend && npx graphql-codegen

kassa_localtunnel:
	npx lt --port 8000 --subdomain kassa --host https://lt.berekuk.ru

update_requirements:
	$(K) cp backend/requirements.in $(shell $(K) get po -l app=core-django -o name | awk -F "/" '{print $$2}'):/code/requirements.in
	$(K) exec $(shell $(K) get po -l app=core-django -o name) -- pip-compile
	$(K) exec $(shell $(K) get po -l app=core-django -o name) -- pip-sync
	$(K) cp $(shell $(K) get po -l app=core-django -o name | awk -F "/" '{print $$2}'):/code/requirements.txt ./backend/requirements.txt

graphql_schema:
	$(K) exec $(shell $(K) get po -l app=core-django -o name) -- ./scripts/export-schema.py schema.graphql
	$(K) cp $(shell $(K) get po -l app=core-django -o name | awk -F "/" '{print $$2}'):/code/schema.graphql ./schema.graphql

graphql_types:
	cd frontend && gql-gen

graphql: graphql_schema graphql_types

restart_backend:
	$(K) rollout restart deploy/core-django

restart_frontend:
	$(K) rollout restart deploy/core-frontend

dry_migrations:
	@test $(APP) || (echo "APP is not set"; exit 1)
	$(K) exec $(shell $(K) get po -l app=core-django -o name) -- ./manage.py makemigrations --dry-run $(APP)

migrations:
	@test $(NAME) || (echo "NAME is not set"; exit 1)
	@test $(APP) || (echo "APP is not set"; exit 1)
	RESULT=$$($(K) exec $(shell $(K) get po -l app=core-django -o name) -- ./manage.py makemigrations -n $(NAME) $(APP)) && \
	(for filename in $$(echo "$$RESULT" | fgrep '/'); do \
	$(K) cp $(shell $(K) get po -l app=core-django -o name | awk -F "/" '{print $$2}'):/code/$$filename ./backend/$$filename; \
	done)

migrate:
	$(K) exec $(shell $(K) get po -l app=core-django -o name) -- ./manage.py migrate

wagtail_init:
	$(K) exec $(shell $(K) get po -l app=core-django -o name) -- ./scripts/wagtail-init.py

dump_db:
	$(KDEV) exec $(shell $(KDEV) get po -l app=core-mysql -o name) -- sh -c 'mysqldump -u$$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE | gzip -c' >dump.gz

restore_db:
	cat dump.gz | zcat | $(KDEV) exec -i $(shell $(KDEV) get po -l app=core-mysql -o name) -- sh -c 'mysql -u$$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
