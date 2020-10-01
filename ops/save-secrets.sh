#!/bin/sh

set -e

export VAULT_ADDR='https://vault.team.kocherga.club'

for filename in $(find ops/secrets -type f); do
    shortname=$(echo $filename | perl -nE 'm{ops/secrets/(.*)} and say $1 or die "oops"')
    vault kv put kv/chart-secrets/$shortname content=@$filename
done
