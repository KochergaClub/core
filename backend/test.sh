#!/bin/bash

docker-compose -f ../docker/compose.dev.yml exec api pytest "$@"
