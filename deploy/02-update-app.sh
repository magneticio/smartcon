#!/bin/sh
vampctl config set -r smartcon

kubectl apply -f ./02-update-app/k8s-deployment.yaml
vampctl update destination smartcon-app -f ./02-update-app/vamp-destination.yaml
vampctl update vamp_service smartcon-app -f ./02-update-app/vamp-service.yaml --host smartcon.kubecon.demo.vamp.cloud

vampctl release smartcon-app --destination smartcon-app --port 5000 --subset smartcon-app-v2 -l version=v2.0 --type health

