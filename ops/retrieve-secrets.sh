#!/bin/bash

set -e

export VAULT_ADDR='https://vault.team.kocherga.club'
PREFIX=kv/chart-secrets

cp -r ops/secrets secrets-backup
cd ops/secrets

for dir in "" "core/dev/" "core/prod/"; do
    for filename in $(vault kv list -format=json $PREFIX/$dir | jq -r '.[]' | fgrep -v '/'); do
        fullname="$dir$filename"
        echo $fullname
        mkdir -p $(dirname "$fullname")
        vault kv get -format json $PREFIX/$fullname | jq -j '.data.data["content"]' >$fullname
    done
done
