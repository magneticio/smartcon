#!/bin/sh

PROJECT_NAME=${1:-vamp}
CLUSTER_NAME=${2:-demo}
NAMESPACE_NAME=${3:-$PROJECT_NAME}

vampctl config set -p $PROJECT_NAME
vampctl config set -c $CLUSTER_NAME
vampctl config set -r $NAMESPACE_NAME

kubectl apply -f ./01-deploy-app/k8s-deployment.yaml
vampctl create destination smartcon-app -f ./01-deploy-app/vamp-destination.yaml
vampctl create vamp_service smartcon-app -f ./01-deploy-app/vamp-service.yaml --host smartcon.kubecon.demo.vamp.cloud
