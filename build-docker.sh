#!/bin/bash
set -e

echo "=== 1. Building Docker Image (linux/amd64, no-cache) ==="
docker build --platform linux/amd64 --no-cache -t 10.121.88.26:8082/poc/atlas-mobile:dev -t atlas-mobile:latest .

echo "=== 2. Exporting Image to TAR (This may take a while...) ==="
docker save 10.121.88.26:8082/poc/atlas-mobile:dev -o atlas-mobile-dev-images.tar

echo "=== 3. Done! ==="
echo "You can now copy 'atlas-mobile-dev-images.tar', 'docker-compose.yml', and '.env' to your server."