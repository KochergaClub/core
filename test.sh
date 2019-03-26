#!/bin/bash

docker-compose -f docker/compose.dev.yml exec api poetry run pytest "$@"
