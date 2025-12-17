#!/bin/bash

# BTK Cars - GCP Deployment Script
# This script deploys the API to your GCP instance

# Configuration
GCP_IP="35.241.90.194"
GCP_USER="your_gcp_username"  # Replace with your GCP username
REMOTE_DIR="/home/$GCP_USER/btk_cars"

echo "================================================"
echo "BTK Cars - Deploying to GCP"
echo "================================================"

# Check if API build exists
if [ ! -d "api" ]; then
    echo "Error: API build directory not found!"
    echo "Please run this script from the publish directory"
    exit 1
fi

echo ""
echo "Step 1: Creating remote directory structure..."
ssh $GCP_USER@$GCP_IP "mkdir -p $REMOTE_DIR/api $REMOTE_DIR/wwwroot/uploads"

echo ""
echo "Step 2: Uploading API files..."
scp -r api/* $GCP_USER@$GCP_IP:$REMOTE_DIR/api/

echo ""
echo "Step 3: Uploading startup script..."
scp start-api.sh $GCP_USER@$GCP_IP:$REMOTE_DIR/
ssh $GCP_USER@$GCP_IP "chmod +x $REMOTE_DIR/start-api.sh"

echo ""
echo "Step 4: Installing/Updating .NET SDK on GCP (if needed)..."
ssh $GCP_USER@$GCP_IP << 'ENDSSH'
    # Check if .NET is installed
    if ! command -v dotnet &> /dev/null; then
        echo ".NET not found. Installing .NET 9.0..."
        wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
        chmod +x dotnet-install.sh
        ./dotnet-install.sh --channel 9.0
        echo 'export DOTNET_ROOT=$HOME/.dotnet' >> ~/.bashrc
        echo 'export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools' >> ~/.bashrc
        source ~/.bashrc
    else
        echo ".NET is already installed: $(dotnet --version)"
    fi
ENDSSH

echo ""
echo "Step 5: Stopping existing API process (if running)..."
ssh $GCP_USER@$GCP_IP "pkill -f 'dotnet.*BtkCarsApi' || true"

echo ""
echo "Step 6: Starting API on GCP..."
ssh $GCP_USER@$GCP_IP "cd $REMOTE_DIR && nohup ./start-api.sh > api.log 2>&1 &"

echo ""
echo "Waiting for API to start..."
sleep 5

echo ""
echo "Step 7: Checking API status..."
ssh $GCP_USER@$GCP_IP "curl -s http://localhost:5000/api/cars > /dev/null && echo 'API is running!' || echo 'API may not be running. Check logs with: ssh $GCP_USER@$GCP_IP tail -f $REMOTE_DIR/api.log'"

echo ""
echo "================================================"
echo "Deployment Complete!"
echo "================================================"
echo ""
echo "API URL: http://$GCP_IP:5000/api/"
echo "Swagger: http://$GCP_IP:5000/swagger"
echo ""
echo "To view logs: ssh $GCP_USER@$GCP_IP tail -f $REMOTE_DIR/api.log"
echo "To stop API: ssh $GCP_USER@$GCP_IP pkill -f 'dotnet.*BtkCarsApi'"
echo ""
