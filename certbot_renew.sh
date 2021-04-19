#!/bin/bash

COMPOSE="/usr/local/bin/docker-compose --no-ansi"
DOCKER="/usr/bin/docker"

cd ~/docker-nginx-node/
$COMPOSE run certbot renew --dry-run --cert-name therapeutichermeneutic.org --webroot --webroot-path=/var/www/therapeutichermeneutic.org/html  && $COMPOSE kill -s SIGHUP webserver

