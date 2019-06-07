#!/usr/bin/bash

docker-compose ps
docker-compose down -v

docker pull selenoid/vnc:chrome_73.0
docker pull selenoid/video-recorder:latest-release

docker network create selenoid

docker-compose up -d
docker-compose ps
