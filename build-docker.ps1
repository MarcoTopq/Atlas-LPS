$ErrorActionPreference = "Stop"

Write-Host "=== 1. Building Docker Image (linux/amd64, no-cache) ===" -ForegroundColor Green
docker build --platform linux/amd64 --no-cache -t 10.121.88.26:8082/poc/atlas-mobile:dev -t atlas-mobile:latest .

Write-Host "=== 2. Exporting Image to TAR (This may take a while...) ===" -ForegroundColor Green
docker save 10.121.88.26:8082/poc/atlas-mobile:dev -o atlas-mobile-dev-images.tar

Write-Host "=== 3. Done! ===" -ForegroundColor Green
Write-Host "You can now copy 'atlas-mobile-dev-images.tar', 'docker-compose.yml', and '.env' to your server."
