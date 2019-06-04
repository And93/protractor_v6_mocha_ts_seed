#!/usr/bin/bash

docker-compose ps
docker-compose down -v
docker-compose ps

docker rmi -f e2e

#docker rmi $(docker images -qf dangling=true)
#docker rm -v $(docker ps -a -qf status=exited)
#docker volume rm $(docker volume ls -qf dangling=true)
