#!/usr/bin/bash

docker-compose ps
docker-compose down -v
docker-compose ps

docker network rm selenoid
