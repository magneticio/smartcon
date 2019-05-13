#!/bin/sh

vampctl config set -r smartcon

kubectl apply -f ./01-deploy-app/k8s-deployment.yaml
vampctl create destination smartcon-app-destination -f ./01-deploy-app/vamp-destination.yaml
vampctl create vampservice smartcon-app -f ./01-deploy-app/vamp-service.yaml
