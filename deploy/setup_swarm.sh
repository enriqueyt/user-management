#!/bin/bash

# Initialize Docker Swarm
echo "Initializing Docker Swarm..."
docker swarm init

# Define network name
NETWORK_NAME="app_network"
echo "Creating overlay network: $NETWORK_NAME"
docker network create -d overlay $NETWORK_NAME

# Run docker-compose build
echo "Building Docker images..."
docker-compose build

# Define service names and replicas
BACKEND_SERVICE_NAME="backend"
FRONTEND_SERVICE_NAME="frontend"
MONGODB_SERVICE_NAME="mongodb"
BACKEND_REPLICAS=2
FRONTEND_REPLICAS=2

# Deploy the MongoDB service
echo "Deploying MongoDB service..."
docker service create \
  --name $MONGODB_SERVICE_NAME \
  --network $NETWORK_NAME \
  --replicas 1 \
  --env MONGO_INITDB_ROOT_USERNAME=root \
  --env MONGO_INITDB_ROOT_PASSWORD=examplepassword \
  mongo:latest

# Deploy the backend service
echo "Deploying backend service with $BACKEND_REPLICAS replicas..."
docker service create \
  --name $BACKEND_SERVICE_NAME \
  --replicas $BACKEND_REPLICAS \
  --network $NETWORK_NAME \
  --publish 3000:3000 \
  --env MONGODB_URI="mongodb://root:examplepassword@mongodb:27017/user_management?authSource=admin" \
  user-management-backend

# Deploy the frontend service
echo "Deploying frontend service with $FRONTEND_REPLICAS replicas..."
docker service create \
  --name $FRONTEND_SERVICE_NAME \
  --replicas $FRONTEND_REPLICAS \
  --network $NETWORK_NAME \
  --publish 80:80 \
  user-management-frontend

# Verify services are running and show status
echo "Verifying services and displaying status..."
docker service ls

echo "Setup complete. Access the frontend at http://localhost and backend at http://localhost:3000"