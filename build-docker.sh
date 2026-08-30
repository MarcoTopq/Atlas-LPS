#!/bin/bash
set -e

echo "=== 1. Building Docker Images (linux/amd64) ==="
# Set target platform to linux/amd64 so it runs on the server properly
export DOCKER_DEFAULT_PLATFORM=linux/amd64
docker compose -f docker-compose.yml build

echo "=== 2. Tagging Images ==="
# Tag the built images properly for the production compose
docker tag atlas-mobile:latest 10.121.88.26:8082/poc/atlas-mobile:dev

echo "=== 3. Exporting Images to TAR (This may take a while...) ==="
# Use a single docker save command to combine all images into one tar
docker save 10.121.88.26:8082/poc/atlas-mobile:dev -o atlas-mobile-dev-images.tar

echo "=== 4. Done! ==="
echo "You can now copy 'atlas-mobile-dev-images.tar', 'docker-compose.yml', and '.env' to your server."


    