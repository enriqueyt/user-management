#!/bin/bash

# Stop all running Docker services in Swarm mode
echo "Stopping all Docker services in Swarm mode..."
docker service rm $(docker service ls -q)

# Leave the Docker Swarm (optional if you want to reset the Swarm configuration)
echo "Leaving Docker Swarm..."
docker swarm leave --force

# Remove all Docker networks created by Docker Swarm
echo "Removing all Docker networks..."
docker network prune -f

# Remove all stopped containers
echo "Removing all stopped containers..."
docker container prune -f

# Remove all Docker images
echo "Removing all Docker images..."
docker image prune -a -f

# Remove all unused Docker volumes (optional, but useful if you want a completely clean environment)
echo "Removing all unused Docker volumes..."
docker volume prune -f

echo "Docker environment reset complete. You can now rebuild everything from scratch."