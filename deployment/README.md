# EPCIS 2.0 Deployment

[![License: Apache](https://img.shields.io/github/license/yalewkidane/epcisv2.svg)](https://opensource.org/licenses/Apache-2.0)
[![Docker Hub](https://img.shields.io/docker/pulls/yaledoc/epcis2.svg)](https://hub.docker.com/r/yaledoc/epcis2)

Production-ready deployment configuration for EPCIS 2.0 implementation using Docker containers.

## Table of Contents

- [Quick Start](#quick-start)
- [About EPCIS 2.0](#about-epcis-20)
- [Docker Image](#docker-image)
- [Installation](#installation)
- [Configuration](#configuration)
- [Services](#services)
- [API Access](#api-access)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

## Quick Start

Deploy EPCIS 2.0 in two simple steps:

```bash
# Step 1: Download EPCIS Docker image
./docker-pull.sh

# Step 2: Deploy all services
./deploy.sh deploy
```

Access the API at: http://localhost:7080/epcis/v2

## About EPCIS 2.0

This is a Node.js implementation of EPCIS/CBV 2.0 that provides:

- **JSON-based event capture** and querying
- **REST API** for integration
- **Webhook and WebSocket subscriptions**
- **Sensor data support** for IoT applications
- **Supply chain visibility** and traceability
- **GS1 Digital Link** URI syntax support

### Key Features

- ✅ **Production Ready**: Secure, optimized Docker containers
- ✅ **Multi-stage Builds**: Minimal image size (~500MB)
- ✅ **Security Hardened**: Non-root user, Alpine Linux base
- ✅ **Scalable**: PM2 process manager, MongoDB replica sets
- ✅ **Monitoring**: Health checks and logging
- ✅ **Standards Compliant**: Full EPCIS 2.0 and CBV support

## Docker Image

### Quick Download

Use the provided script to download the EPCIS image:

```bash
# Download latest EPCIS 2.0 image
./docker-pull.sh
```

### Manual Download

If you prefer to download manually:

```bash
# Latest stable version (recommended for production)
docker pull yaledoc/epcis2:latest

# Specific version
docker pull yaledoc/epcis2:2.0-secure

# Development version
docker pull yaledoc/epcis2:2.0-optimized
```

### Image Variants

| Tag | Description | Use Case |
|-----|-------------|----------|
| `latest` | Latest stable production build | **Production deployments** |
| `2.0-secure` | Security-hardened production image | Production with enhanced security |
| `2.0-optimized` | Optimized development build | Development and testing |

### Image Details

- **Base**: Alpine Linux (minimal attack surface)
- **Runtime**: Node.js 20 LTS
- **Process Manager**: PM2 with cluster mode
- **Security**: Non-root user, security patches
- **Size**: ~500MB (multi-stage optimized)

## Installation

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- 2GB RAM minimum
- 10GB disk space

### Simple 2-Step Installation

#### Step 1: Download EPCIS Image

First, download the required EPCIS Docker image:

```bash
# Download EPCIS 2.0 image
./docker-pull.sh
```

This script will download the `yaledoc/epcis2:latest` image locally.

#### Step 2: Deploy Services

Deploy all services using the smart deployment script:

```bash
# Deploy EPCIS 2.0 (automatically uses local images when available)
./deploy.sh deploy
```

The deploy script will:
- Check for local images first
- Use local images if available (faster)
- Pull missing standard images (MongoDB, Redis, etc.) from Docker Hub
- Start all services

#### Step 3: Verify Installation

```bash
# Check service status
./deploy.sh status

# Test API
curl http://localhost:7080/epcis/v2
```

### Alternative Installation Methods

If you prefer manual steps:

```bash
# Manual Docker Compose (requires all images to be available)
docker-compose up -d

# Local-only deployment (uses only local images, fails if missing)
./deploy.sh deploy-local
```

## Configuration

### Environment Variables

Key configuration options in `.env`:

```properties
# Server Configuration
EPCIS_SERVER_PORT=7080
PROTOCOL=http
ENABLE_AUTH=false

# Database
MONGODB_USER=epcis
MONGODB_PASSWORD=epcis

# Security
API_KEYS=your-secret-api-key-here
ENABLE_CORS=true

# MQTT
MQTT_ENABLED=true
MQTT_PORT=1883

# Network
DOCKER_NETWORK=traceability_network
```

### Custom Configuration

For advanced configuration, edit the `.env` file:

- **Authentication**: Set `ENABLE_AUTH=true` and configure JWT_SECRET
- **HTTPS**: Set `PROTOCOL=https` and provide SSL certificates
- **Scaling**: Adjust `NO_OF_PROCESSES` for your hardware
- **MQTT**: Configure broker settings for IoT integration

## Services

The deployment includes these services:

### Core Services

| Service | Port | Description |
|---------|------|-------------|
| **epcis** | 7080 | Main EPCIS 2.0 API server |
| **mongo** | 27018 | MongoDB database with replica set |
| **redis** | 6379 | Cache and session storage |
| **mosquitto** | 1883, 9001 | MQTT broker for IoT |

### Support Services

- **mongo-keygen**: Generates MongoDB security keys
- **mongo-init**: Initializes replica set (runs once)

### Health Checks

All services include health monitoring:

```bash
# Check all services
docker-compose ps

# View service health
docker inspect epcis | grep Health -A 10
```

## API Access

### Base URL

```
http://localhost:7080/epcis/v2
```

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/epcis/v2` | GET | API information |
| `/epcis/v2/events` | POST | Capture events |
| `/epcis/v2/events` | GET | Query events |
| `/epcis/v2/subscriptions` | POST | Create subscription |

### Example: Capture Event

```bash
curl -X POST http://localhost:7080/epcis/v2/events \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "ObjectEvent",
    "eventTime": "2024-01-01T10:00:00Z",
    "eventTimeZoneOffset": "+00:00",
    "epcList": ["urn:epc:id:sgtin:0614141.107340.2017"],
    "action": "OBSERVE",
    "bizStep": "receiving",
    "disposition": "in_progress",
    "readPoint": {"id": "urn:epc:id:sgln:0614141.07346.1234"}
  }'
```

### Authentication (Optional)

When `ENABLE_AUTH=true`:

```bash
# Get token
curl -X POST http://localhost:7080/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username": "admin", "password": "admin"}'

# Use token
curl -X GET http://localhost:7080/epcis/v2/events \\
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Check what's using port 7080
sudo lsof -i :7080

# Use different port
echo "EPCIS_SERVER_PORT=8080" >> .env
docker-compose up -d
```

#### 2. MongoDB Connection Issues

```bash
# Check MongoDB logs
docker-compose logs mongo

# Restart MongoDB services
docker-compose restart mongo mongo-init
```

#### 3. Service Won't Start

```bash
# Check logs
docker-compose logs epcis

# Restart specific service
docker-compose restart epcis
```

### Debugging Commands

```bash
# View all logs
docker-compose logs -f

# Check container status
docker-compose ps

# Execute commands in container
docker-compose exec epcis sh

# Check network connectivity
docker-compose exec epcis ping mongo
```

### Clean Installation

```bash
# Stop and remove all containers
docker-compose down -v

# Remove images (optional)
docker rmi yaledoc/epcis2:latest

# Clean start
docker-compose up -d
```

## Support

### Documentation

- [EPCIS 2.0 Standard](https://www.gs1.org/standards/epcis)
- [API Documentation](https://epcisv2.readthedocs.io/)
- [Docker Hub Repository](https://hub.docker.com/r/yaledoc/epcis2)

### Community

- **Issues**: [GitHub Issues](https://github.com/yalewkidane/epcis-deployment/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yalewkidane/epcis-deployment/discussions)

### Commercial Support

For enterprise support, customization, and consulting services, please contact:
- Email: [your-email@domain.com]
- Website: [your-website.com]

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

**Production Ready** • **Docker Optimized** • **Standards Compliant**
