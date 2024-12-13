#!/bin/bash

# Build backend
echo "Building backend..."
cd backend/cmd/chama-server
go build -o chama-server

# Build frontend
echo "Building frontend..."
cd ../../../frontend
npm run build

# Deploy backend
echo "Deploying backend..."
# TODO: Add commands to deploy the backend (e.g., copying files to server, restarting service)

# Deploy frontend
echo "Deploying frontend..."
# TODO: Add commands to deploy the frontend (e.g., copying build files to web server)

echo "Deployment complete!"

