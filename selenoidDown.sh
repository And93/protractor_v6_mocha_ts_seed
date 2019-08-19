#!/usr/bin/bash

docker-compose -f docker-compose.selenoid.yml ps
docker-compose -f docker-compose.selenoid.yml down -v
docker-compose -f docker-compose.selenoid.yml ps

docker network rm selenoid
