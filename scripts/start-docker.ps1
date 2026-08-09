# Starts Expo inside Docker with the correct LAN IP for Expo Go.
$ErrorActionPreference = "Stop"

$ip = Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object { $_.IPAddress -like "192.168.*" } |
  Select-Object -First 1 -ExpandProperty IPAddress

if (-not $ip) {
  Write-Error "No 192.168.x.x Wi-Fi/LAN IP found. Connect to Wi-Fi and retry."
}

$env:HOST_IP = $ip
Write-Host "Using HOST_IP=$ip"
Write-Host "In Expo Go open: exp://${ip}:8081"
Write-Host ""

# Free host port 8081 if something else is listening
Get-NetTCPConnection -LocalPort 8081 -State Listen -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }

Set-Location (Join-Path $PSScriptRoot "..")
docker compose up --build
