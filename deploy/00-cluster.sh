#!/bin/sh

terraform init ./00-cluster
terraform apply -var "name=kubecon" ./00-cluster

gcloud container clusters get-credentials kubecon --region europe-west4