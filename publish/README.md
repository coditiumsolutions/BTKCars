# BTK Cars API - GCP Deployment Package

This package contains everything needed to deploy the BTK Cars API to Google Cloud Platform.

## Contents

- `api/` - Production build of the .NET API
- `start-api.sh` - Startup script for running the API on GCP
- `deploy-to-gcp.sh` - Automated deployment script (Linux/Mac/Git Bash)
- `deploy-manual.md` - Detailed manual deployment instructions
- `appsettings.Production.json` - Production configuration

## Quick Start

### Prerequisites
- SSH access to your GCP instance (35.241.90.194)
- .NET 9.0 SDK installed on GCP (script will help install if needed)
- Firewall rule allowing port 5000

### Deployment Options

#### Option 1: Automated Deployment (Recommended for Linux/Mac/Git Bash)

1. Edit `deploy-to-gcp.sh` and set your GCP username:
   ```bash
   GCP_USER="your_username"
   ```

2. Run deployment:
   ```bash
   chmod +x deploy-to-gcp.sh
   ./deploy-to-gcp.sh
   ```

#### Option 2: Manual Deployment

See [deploy-manual.md](deploy-manual.md) for detailed step-by-step instructions.

#### Option 3: Windows Manual Upload

1. Upload files using WinSCP or similar tool:
   - Connect to: 35.241.90.194
   - Upload `api/*` to `/home/your_username/btk_cars/api/`
   - Upload `start-api.sh` to `/home/your_username/btk_cars/`

2. SSH into GCP and run:
   ```bash
   cd ~/btk_cars
   chmod +x start-api.sh
   ./start-api.sh
   ```

## After Deployment

Once deployed, your API will be available at:

- **API Base URL**: http://35.241.90.194:5000/api/
- **Swagger UI**: http://35.241.90.194:5000/swagger
- **Health Check**: http://35.241.90.194:5000/api/cars

## Configuration

### Database Connection
The API is configured to connect to your Neon PostgreSQL database. Connection string is in `appsettings.Production.json`.

### CORS
Already configured to allow requests from:
- http://35.241.90.194 (your frontend)
- http://localhost:5173 (local development)
- http://localhost:5174 (local development)

### File Uploads
Uploaded images will be stored in:
```
~/btk_cars/wwwroot/uploads/
```

Make sure this directory exists and is writable.

## Troubleshooting

### Port 5000 not accessible
Check GCP firewall rules:
```bash
# On GCP instance
sudo ufw status
sudo ufw allow 5000/tcp
```

Or configure in GCP Console:
- VPC Network > Firewall > Create Firewall Rule
- Allow TCP port 5000 from 0.0.0.0/0

### API not starting
Check logs:
```bash
ssh your_username@35.241.90.194 "tail -f ~/btk_cars/api.log"
```

### Permission errors
Ensure upload directory exists:
```bash
ssh your_username@35.241.90.194 "mkdir -p ~/btk_cars/wwwroot/uploads && chmod 755 ~/btk_cars/wwwroot/uploads"
```

## Management Commands

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
ssh your_username@35.241.90.194 "cd ~/btk_cars && pkill -f 'dotnet.*BtkCarsApi' && nohup ./start-api.sh > api.log 2>&1 &"
```

### Check Status
```bash
ssh your_username@35.241.90.194 "curl -s http://localhost:5000/api/cars"
```

## Support

For detailed instructions, see [deploy-manual.md](deploy-manual.md)

## Production Recommendations

1. **Set up as System Service**: Use systemd to automatically start the API on boot (see deploy-manual.md)
2. **Enable HTTPS**: Configure SSL certificate and update CORS/URLs
3. **Database Backups**: Ensure regular backups of your Neon database
4. **Monitor Logs**: Set up log rotation and monitoring
5. **Security**: Update JWT secret key in production
6. **Environment Variables**: Consider using environment variables for sensitive data
