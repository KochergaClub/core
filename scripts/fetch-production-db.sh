#!/bin/bash

set -e
docker-compose -f docker/compose.dev.yml exec -T db mysql -e 'drop database kocherga; create database kocherga'
ssh kocherga.club "sudo su -c 'mysqldump kocherga_django'" | docker-compose -f docker/compose.dev.yml exec -T db mysql kocherga
