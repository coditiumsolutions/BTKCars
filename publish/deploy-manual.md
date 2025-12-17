# Manual Deployment Guide for GCP

This guide explains how to manually deploy the BTK Cars API to your GCP instance.

## Prerequisites

1. SSH access to your GCP instance (IP: 35.241.90.194)
2. Your GCP username and SSH key configured

## Option 1: Using the Automated Deployment Script (Linux/Mac/Git Bash)

1. Open the deployment script and update the GCP username:
   ```bash
   nano deploy-to-gcp.sh
   # Change: GCP_USER="your_gcp_username"
   ```

2. Make the script executable:
   ```bash
   chmod +x deploy-to-gcp.sh
   ```

3. Run the deployment:
   ```bash
   ./deploy-to-gcp.sh
   ```

## Option 2: Manual Deployment Steps

### Step 1: Upload Files to GCP

From your local machine (from the `publish` directory):

```bash
# Create directory on GCP
ssh your_username@35.241.90.194 "mkdir -p ~/btk_cars/api ~/btk_cars/wwwroot/uploads"

# Upload API files
scp -r api/* your_username@35.241.90.194:~/btk_cars/api/

# Upload startup script
scp start-api.sh your_username@35.241.90.194:~/btk_cars/
ssh your_username@35.241.90.194 "chmod +x ~/btk_cars/start-api.sh"
```

### Step 2: Install .NET on GCP (if not already installed)

SSH into your GCP instance:
```bash
ssh your_username@35.241.90.194
```

Then run:
```bash
# Download .NET install script
wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
chmod +x dotnet-install.sh

# Install .NET 9.0
./dotnet-install.sh --channel 9.0

# Add to PATH
echo 'export DOTNET_ROOT=$HOME/.dotnet' >> ~/.bashrc
echo 'export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools' >> ~/.bashrc
source ~/.bashrc

# Verify installation
dotnet --version
```

### Step 3: Configure Firewall (if needed)

Make sure port 5000 is open on your GCP instance:

```bash
# For Ubuntu/Debian with UFW
sudo ufw allow 5000/tcp
sudo ufw status

# Or configure in GCP Console:
# VPC Network > Firewall > Create Firewall Rule
# - Name: allow-api-5000
# - Targets: All instances in the network
# - Source IP ranges: 0.0.0.0/0
# - Protocols and ports: tcp:5000
```

### Step 4: Start the API

```bash
cd ~/btk_cars
./start-api.sh
```

Or to run in background:
```bash
cd ~/btk_cars
nohup ./start-api.sh > api.log 2>&1 &
```

### Step 5: Verify Deployment

Check if the API is running:
```bash
curl http://localhost:5000/api/cars
```

Or from your local machine:
```bash
curl http://35.241.90.194:5000/api/cars
```

Access Swagger UI:
```
http://35.241.90.194:5000/swagger
```

## Option 3: Using Windows PowerShell

If you're on Windows without Git Bash:

```powershell
# Upload files using SCP (requires OpenSSH client)
scp -r api/* your_username@35.241.90.194:~/btk_cars/api/
scp start-api.sh your_username@35.241.90.194:~/btk_cars/

# Then SSH in and follow steps 2-5 above
ssh your_username@35.241.90.194
```

## Useful Commands

### Check API Status
```bash
ssh your_username@35.241.90.194 "curl -s http://localhost:5000/api/cars"
```

### View Logs
```bash
ssh your_username@35.241.90.194 "tail -f ~/btk_cars/api.log"
```

### Stop API
```bash
ssh your_username@35.241.90.194 "pkill -f 'dotnet.*BtkCarsApi'"
```

### Restart API
```bash
ssh your_username@35.241.90.194 "pkill -f 'dotnet.*BtkCarsApi' && cd ~/btk_cars && nohup ./start-api.sh > api.log 2>&1 &"
```

## Setting up as a System Service (Optional)

For production, consider setting up the API as a systemd service:

1. Create service file:
```bash
sudo nano /etc/systemd/system/btkcars-api.service
```

2. Add content:
```ini
[Unit]
Description=BTK Cars API
After=network.target

[Service]
WorkingDirectory=/home/your_username/btk_cars/api
ExecStart=/home/your_username/.dotnet/dotnet BtkCarsApi.dll
Restart=always
RestartSec=10
User=your_username
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://0.0.0.0:5000

[Install]
WantedBy=multi-user.target
```

3. Enable and start service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable btkcars-api
sudo systemctl start btkcars-api
sudo systemctl status btkcars-api
```

## Troubleshooting

### API not accessible from outside
- Check GCP firewall rules allow port 5000
- Verify the API is listening on 0.0.0.0 (not just localhost)
- Check security groups in GCP console

### CORS errors
- Already configured for http://35.241.90.194
- If using a domain, add it to the CORS policy in Program.cs

### Database connection issues
- Verify the connection string in appsettings.Production.json
- Check if the GCP instance can reach the Neon database
- Verify database credentials

### Permission issues
- Make sure the upload directory exists and is writable:
  ```bash
  mkdir -p ~/btk_cars/wwwroot/uploads
  chmod 755 ~/btk_cars/wwwroot/uploads
  ```
