#!/bin/bash

# start.sh - Quick start script for Docker Compose profiles

set -e

usage() {
  echo "Usage: $0 {dev|prod|both|down|logs|build}"
  echo "  dev   - Start development environment"
  echo "  prod  - Start production environment"
  echo "  both  - Start both environments"
  echo "  down  - Stop all environments"
  echo "  logs  - Show logs for running environment"
  echo "  build - Build all environments"
}

case "$1" in
  dev)
    echo "🚀 Starting development environment..."
    docker compose --profile dev up -d --build
    echo "✅ Development environment running on http://localhost:3000"
    ;;
  prod)
    echo "🚀 Starting production environment..."
    docker compose --profile prod up -d --build
    echo "✅ Production environment running on http://localhost"
    ;;
  both)
    echo "🚀 Starting both environments..."
    docker compose --profile dev --profile prod up -d --build
    echo "✅ Development: http://localhost:3000"
    echo "✅ Production:  http://localhost"
    ;;
  down)
    echo "🛑 Stopping all environments..."
    docker compose --profile dev --profile prod down
    ;;
  logs)
    echo "📋 Showing logs..."
    if [ "$2" = "prod" ]; then
      docker compose --profile prod logs -f
    else
      docker compose --profile dev logs -f
    fi
    ;;
  build)
    echo "🔨 Building all environments..."
    docker compose --profile dev --profile prod build
    ;;
  *)
    usage
    exit 1
    ;;
esac