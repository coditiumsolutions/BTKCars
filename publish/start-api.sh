#!/bin/bash

# BTK Cars API Startup Script for GCP
# This script starts the .NET API on port 5000

echo "Starting BTK Cars API..."

# Set environment to Production
export ASPNETCORE_ENVIRONMENT=Production

# Set the URLs to listen on all interfaces (0.0.0.0) on port 5000
export ASPNETCORE_URLS="http://0.0.0.0:5000"

# Navigate to API directory
cd /home/$(whoami)/btk_cars/api

# Start the API
dotnet BtkCarsApi.dll
