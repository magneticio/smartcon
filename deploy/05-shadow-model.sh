#!/bin/sh
vampctl config set -r smartcon

vampctl update vampservice smartcon-model -f ./05-shadow/vamp-service-model.yaml