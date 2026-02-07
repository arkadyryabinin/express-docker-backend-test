# Express Docker Backend

A simple Node.js Express backend with Docker support.

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone and navigate to project
cd express-docker-backend



# Start development environment with hot reload
docker compose --profile dev up -d --build

# View logs
docker compose --profile dev logs -f

# Access the API
curl http://localhost:3000/api/health

# Stop development environment
docker compose --profile dev down



# Start production environment
docker compose --profile prod up -d --build

# View logs
docker compose --profile prod logs -f

# Access the API (mapped to port 80)
curl http://localhost/api/health

# Stop production environment
docker compose --profile prod down

# Stop and remove volumes
docker compose --profile prod down -v


# Build all profiles
docker compose --profile dev --profile prod build

# Start both profiles (not typical, but possible)
docker compose --profile dev --profile prod up -d

# Check running containers by profile
docker compose --profile dev ps
docker compose --profile prod ps

# Execute commands in containers
docker compose --profile dev exec backend-dev sh
docker compose --profile prod exec backend-prod sh




chmod +x start.sh


