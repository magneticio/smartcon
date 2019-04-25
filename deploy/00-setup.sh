#!/bin/sh

PROJECT_NAME=${1:-vamp}
CLUSTER_NAME=${2:-demo}
NAMESPACE_NAME=${3:-$PROJECT_NAME}

# Install Vamp Kubist CLI
curl -Lo vampctl https://github.com/magneticio/vampkubistcli/releases/download/v0.0.24/vamp-darwin-x86_64 && chmod +x vampctl && sudo mv vampctl /usr/local/bin/

# Install Vamp
vampctl install --configuration ./00-setup/vamp-configuration.yaml

# Login to Vamp
vampctl login --url https://35.204.215.226:8888 --user root --cert certificate.crt

# Create project
vampctl create project $PROJECT_NAME -f ./00-setup/vamp-project.yaml
vampctl get project $PROJECT_NAME
vampctl config set -p $PROJECT_NAME

# Bootstrap the cluster
vampctl bootstrap cluster $CLUSTER_NAME
vampctl get cluster $CLUSTER_NAME
vampctl config set -c $CLUSTER_NAME

# Create Kubernetes Namespace
kubectl apply -f ./00-setup/k8s-namespace.yaml
kubectl describe ns $NAMESPACE_NAME
vampctl config set -r $NAMESPACE_NAME
vampctl get virtualcluster $NAMESPACE_NAME

# Create Kubenetes Deployment
kubectl apply -f ./00-setup/k8s-deployment.yaml

# Create Vamp Gateway & Destinations
vampctl create gateway -r $NAMESPACE_NAME smartcon -f ./00-setup/vamp-gateway.yaml
vampctl create destination app -f ./00-setup/vamp-destination.yaml
vampctl create vamp_service app -f ./00-setup/vamp-service.yaml --host smartcon.kubecon.demo.vamp.cloud