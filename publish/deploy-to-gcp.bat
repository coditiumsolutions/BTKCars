@echo off
REM BTK Cars - Windows Deployment Script for GCP
REM This script uses SCP to upload files to GCP

setlocal

REM Configuration - EDIT THESE VALUES
set GCP_IP=35.241.90.194
set GCP_USER=your_gcp_username
set REMOTE_DIR=/home/%GCP_USER%/btk_cars

echo ================================================
echo BTK Cars - Deploying to GCP from Windows
echo ================================================
echo.
echo Using GCP IP: %GCP_IP%
echo Using User: %GCP_USER%
echo.
echo IMPORTANT: Make sure you have edited this file and set GCP_USER
echo Press Ctrl+C to cancel, or
pause

REM Check if api directory exists
if not exist "api" (
    echo Error: API build directory not found!
    echo Please run this script from the publish directory
    pause
    exit /b 1
)

echo.
echo Step 1: Creating remote directory structure...
ssh %GCP_USER%@%GCP_IP% "mkdir -p %REMOTE_DIR%/api %REMOTE_DIR%/wwwroot/uploads"

echo.
echo Step 2: Uploading API files...
echo This may take a few minutes...
scp -r api/* %GCP_USER%@%GCP_IP%:%REMOTE_DIR%/api/

echo.
echo Step 3: Uploading startup script...
scp start-api.sh %GCP_USER%@%GCP_IP%:%REMOTE_DIR%/
ssh %GCP_USER%@%GCP_IP% "chmod +x %REMOTE_DIR%/start-api.sh"

echo.
echo Step 4: Stopping existing API process (if running)...
ssh %GCP_USER%@%GCP_IP% "pkill -f 'dotnet.*BtkCarsApi' || true"

echo.
echo Step 5: Starting API on GCP...
ssh %GCP_USER%@%GCP_IP% "cd %REMOTE_DIR% && nohup ./start-api.sh > api.log 2>&1 &"

echo.
echo Waiting for API to start...
timeout /t 5 /nobreak > nul

echo.
echo Step 6: Checking API status...
ssh %GCP_USER%@%GCP_IP% "curl -s http://localhost:5000/api/cars && echo API is running! || echo API may not be running. Check logs."

echo.
echo ================================================
echo Deployment Complete!
echo ================================================
echo.
echo API URL: http://%GCP_IP%:5000/api/
echo Swagger: http://%GCP_IP%:5000/swagger
echo.
echo To view logs: ssh %GCP_USER%@%GCP_IP% tail -f %REMOTE_DIR%/api.log
echo To stop API: ssh %GCP_USER%@%GCP_IP% pkill -f "dotnet.*BtkCarsApi"
echo.
pause
