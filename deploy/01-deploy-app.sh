#!/bin/sh

vampctl config set -r smartcon

kubectl apply -f ./01-deploy-app/k8s-deployment.yaml
vampctl create destination smartcon-app -f ./01-deploy-app/vamp-destination.yaml
vampctl create vamp_service smartcon-app -f ./01-deploy-app/vamp-service.yaml --host smartcon.kubecon.demo.vamp.cloud
