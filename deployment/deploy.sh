#!/bin/bash

# EPCIS 2.0 Deployment Script
# Quick deployment and management script for EPCIS 2.0

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    
    print_info "Prerequisites check passed"
}

# Deploy EPCIS
deploy() {
    print_header "Deploying EPCIS 2.0"
    
    check_prerequisites
    
    if [[ ! -f ".env" ]]; then
        print_error ".env file not found. Please copy .env.example to .env and configure it."
        exit 1
    fi
    
    print_info "Pulling latest images..."
    docker-compose pull
    
    print_info "Starting services..."
    docker-compose up -d
    
    print_info "Waiting for services to be ready..."
    sleep 30
    
    show_status
    show_info
}

# Stop EPCIS
stop() {
    print_header "Stopping EPCIS 2.0"
    docker-compose down
    print_info "All services stopped"
}

# Restart EPCIS
restart() {
    print_header "Restarting EPCIS 2.0"
    docker-compose restart
    print_info "All services restarted"
}

# Show status
show_status() {
    print_header "Service Status"
    docker-compose ps
}

# Show logs
show_logs() {
    local service=${1:-""}
    
    if [[ -n "$service" ]]; then
        print_header "Logs for $service"
        docker-compose logs -f "$service"
    else
        print_header "All Service Logs"
        docker-compose logs -f
    fi
}

# Show connection info
show_info() {
    print_header "EPCIS 2.0 Connection Information"
    
    local port=$(grep EPCIS_SERVER_PORT .env | cut -d'=' -f2)
    local protocol=$(grep PROTOCOL .env | cut -d'=' -f2)
    
    echo -e "${GREEN}API Base URL:${NC} ${protocol}://localhost:${port}/epcis/v2"
    echo -e "${GREEN}API Documentation:${NC} ${protocol}://localhost:${port}/epcis/v2/openapi.json"
    echo -e "${GREEN}Health Check:${NC} ${protocol}://localhost:${port}/epcis/v2"
    echo ""
    echo -e "${YELLOW}Services:${NC}"
    echo "  - EPCIS API: ${protocol}://localhost:${port}"
    echo "  - MongoDB: localhost:27018"
    echo "  - Redis: localhost:6379"
    echo "  - MQTT: localhost:1883"
    echo ""
    echo -e "${YELLOW}Test API:${NC}"
    echo "curl -X GET ${protocol}://localhost:${port}/epcis/v2"
}

# Update images
update() {
    print_header "Updating EPCIS 2.0"
    
    print_info "Pulling latest images..."
    docker-compose pull
    
    print_info "Recreating containers with new images..."
    docker-compose up -d --force-recreate
    
    print_info "Update completed"
    show_status
}

# Cleanup
cleanup() {
    print_header "Cleaning Up EPCIS 2.0"
    
    print_warning "This will remove all containers, networks, and volumes!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v --remove-orphans
        docker system prune -f
        print_info "Cleanup completed"
    else
        print_info "Cleanup cancelled"
    fi
}

# Show help
show_help() {
    cat << EOF
EPCIS 2.0 Deployment Script

USAGE:
    $0 [COMMAND]

COMMANDS:
    deploy      Deploy EPCIS 2.0 services
    stop        Stop all services
    restart     Restart all services
    status      Show service status
    logs [svc]  Show logs (optionally for specific service)
    info        Show connection information
    update      Update to latest images
    cleanup     Remove all containers and volumes
    help        Show this help message

EXAMPLES:
    $0 deploy           # Deploy EPCIS 2.0
    $0 logs epcis       # Show EPCIS service logs
    $0 status           # Check service status
    $0 update           # Update to latest version

EOF
}

# Main script logic
main() {
    case "${1:-help}" in
        "deploy")
            deploy
            ;;
        "stop")
            stop
            ;;
        "restart")
            restart
            ;;
        "status")
            show_status
            ;;
        "logs")
            show_logs "$2"
            ;;
        "info")
            show_info
            ;;
        "update")
            update
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            echo
            show_help
            exit 1
            ;;
    esac
}

main "$@"
