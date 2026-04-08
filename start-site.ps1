param(
    [int]$PreferredPort = 8000
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Test-PortInUse {
    param([int]$Port)
    try {
        $conn = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction Stop
        return $conn -ne $null
    } catch {
        return $false
    }
}

function Get-OpenPort {
    param([int]$StartPort)
    $port = $StartPort
    while (Test-PortInUse -Port $port) {
        $port++
        if ($port -gt 65535) {
            throw "No free port available."
        }
    }
    return $port
}

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

if (-not (Get-Command python -ErrorAction SilentlyContinue) -and -not (Get-Command py -ErrorAction SilentlyContinue)) {
    throw "Python is not installed. Install Python 3.x and re-run this script."
}

$port = Get-OpenPort -StartPort $PreferredPort
$serverCommand = if (Get-Command python -ErrorAction SilentlyContinue) { "python" } else { "py" }
$args = @("-m", "http.server", "$port")

Write-Host "Starting SolarLearn at http://localhost:$port/index.html"
Write-Host "Press Ctrl+C in this terminal to stop the server."

Start-Process "http://localhost:$port/index.html"
& $serverCommand @args
