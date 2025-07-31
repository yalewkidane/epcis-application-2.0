# EPCIS 2.0 Deployment Files

This directory contains production-ready deployment files for EPCIS 2.0.

## Quick Start

```bash
# Deploy EPCIS 2.0
./deploy.sh deploy

# Check status
./deploy.sh status

# View logs
./deploy.sh logs

# Stop services
./deploy.sh stop
```

## Files

- `README.md` - Complete deployment documentation
- `docker-compose.yml` - Production Docker Compose configuration
- `.env` - Environment configuration
- `deploy.sh` - Deployment management script
- `LICENSE` - Apache 2.0 License

## Docker Image

Pull the latest secure production image:

```bash
docker pull yaledoc/epcis2:latest
```

## Support

For issues and questions, please visit:
https://github.com/yalewkidane/epcis-deployment
