$ErrorActionPreference = "Stop"

Write-Host "=== 1. Building Docker Images (linux/amd64, no-cache) ===" -ForegroundColor Green
$env:DOCKER_DEFAULT_PLATFORM="linux/amd64"
docker compose -f docker-compose.yml build --no-cache

Write-Host "=== 2. Tagging Images ===" -ForegroundColor Green
docker tag atlas-mobile:latest 10.121.88.26:8082/poc/atlas-mobile:dev

Write-Host "=== 3. Exporting Images to TAR (This may take a while...) ===" -ForegroundColor Green
docker save 10.121.88.26:8082/poc/atlas-mobile:dev -o atlas-mobile-dev-images.tar

Write-Host "=== 4. Done! ===" -ForegroundColor Green
Write-Host "You can now copy 'atlas-mobile-dev-images.tar', 'docker-compose.yml', and '.env' to your server."
