#!/bin/bash

# EPCIS 2.0 Docker Pull Script - Minimal Version
# Simple script to pull Docker images with token authentication

set -e

# Colors for output (matching deploy.sh)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Load configuration
load_config() {
    if [[ -f "docker-pull.env" ]]; then
        source docker-pull.env
    fi
    
    # Set defaults
    DOCKER_USERNAME="${DOCKER_USERNAME:-yaledoc}"
    IMAGE_NAME="${IMAGE_NAME:-epcis2}"
    IMAGE_TAG="${IMAGE_TAG:-latest}"
    FULL_IMAGE="${DOCKER_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
}

# Main pull function
pull_image() {
    load_config
    
    if [[ -z "$DOCKER_TOKEN" ]]; then
        print_error "DOCKER_TOKEN not set. Add it to docker-pull.env "
        exit 1
    fi
    
    print_info "Logging in to Docker Hub..."
    echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USERNAME" --password-stdin
    
    print_info "Pulling image: $FULL_IMAGE"
    docker pull "$FULL_IMAGE"
    
    print_info "Logging out..."
    docker logout
    
    print_info "Successfully pulled: $FULL_IMAGE"
}

# Create config example
init_config() {
    cat > docker-pull.env << 'EOF'
# Docker Hub Configuration
DOCKER_USERNAME=yaledoc
DOCKER_TOKEN=dckr_pat_your_token_here
IMAGE_NAME=epcis2
IMAGE_TAG=latest
EOF
    print_info "Created docker-pull.env - edit it with your token"
}

# Show help
show_help() {
    cat << EOF
EPCIS 2.0 Docker Pull Script

USAGE:
    $0 [COMMAND]

COMMANDS:
    pull        Pull Docker image (default)
    init        Create config file
    help        Show this help

CONFIGURATION:
    Create docker-pull.env with:
    DOCKER_TOKEN=dckr_pat_your_token
    DOCKER_USERNAME=yaledoc
    IMAGE_TAG=latest

EXAMPLES:
    $0 init     # Create config file
    $0 pull     # Pull image
    $0          # Same as pull

EOF
}

# Main logic
case "${1:-pull}" in
    "pull") pull_image ;;
    "init") init_config ;;
    "help"|"-h") show_help ;;
    *) print_error "Unknown command: $1"; show_help; exit 1 ;;
esac