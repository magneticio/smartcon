#!/bin/sh
vampctl config set -r smartcon

kubectl apply -f ./02-update-app/k8s-deployment.yaml

vampctl create destination smartcon-model-destination -f ./02-update-app/vamp-destination-model.yaml
vampctl create vampservice smartcon-model -f ./02-update-app/vamp-service-model.yaml

vampctl update destination smartcon-app-destination -f ./02-update-app/vamp-destination-app.yaml
vampctl update vampservice smartcon-app -f ./02-update-app/vamp-service-app.yaml

vampctl create canaryrelease smartcon-app -f ./02-update-app/vamp-release.yaml

kubectl apply -f ./02-update-app/k8s-deployment-fix.yaml

vampctl delete canaryrelease smartcon-app