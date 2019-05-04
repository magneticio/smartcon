#!/bin/sh

# Install Vamp Kubist CLI
#curl -Lo vampctl https://github.com/magneticio/vampkubistcli/releases/download/v0.0.25/vamp-darwin-x86_64 && chmod +x vampctl && sudo mv vampctl /usr/local/bin/

# Install Vamp
vampctl install --configuration ./00-setup/vamp-configuration.yaml

# Login to Vamp
vampctl login --url https://35.204.207.214:8888 --user root --cert certificate.crt


# Create Kubernetes Namespace
kubectl apply -f ./00-setup/k8s-namespace.yaml
kubectl describe ns smartcon
vampctl config set -r smartcon
vampctl get virtualcluster smartcon

# Create Gateway
vampctl create gateway smartcon -f ./00-setup/vamp-gateway.yaml
