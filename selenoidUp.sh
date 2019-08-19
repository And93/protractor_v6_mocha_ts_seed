#!/usr/bin/bash

docker-compose -f docker-compose.selenoid.yml ps
docker-compose -f docker-compose.selenoid.yml down -v

docker pull selenoid/vnc:chrome_73.0
docker pull selenoid/video-recorder:latest-release

docker network create selenoid

docker-compose -f docker-compose.selenoid.yml up -d
docker-compose -f docker-compose.selenoid.yml ps
