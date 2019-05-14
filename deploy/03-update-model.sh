#!/bin/sh
vampctl config set -r smartcon

kubectl apply -f ./03-update-model/k8s-deployment.yaml

vampctl update destination smartcon-model-destination -f ./03-update-model/vamp-destination-model.yaml
vampctl update vampservice smartcon-model -f ./03-update-model/vamp-service-model.yaml

vampctl create canaryrelease smartcon-app -f ./03-update-model/vamp-release.yaml