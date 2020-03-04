#!/bin/bash

kubectl exec --context=dev -it $(kubectl get po --context=dev -l app=core-django -o name) -- pytest "$@"
