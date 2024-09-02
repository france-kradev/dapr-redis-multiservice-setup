# Docker Compose Setup for Multi Service Application with Dapr and Redis

A configuration for setting up a local development environment with multiple Node.js applications, Redis, and Dapr.

## Services

### Node.js Applications
- **app1**, **app2**, **app3**:
    - These are three Node.js applications built from the same Dockerfile located in the `./node` directory.
    - Each application exposes port 3000 internally but maps to different external ports for access:
        - `app1` is accessible at `http://localhost:3001`
        - `app2` is accessible at `http://localhost:3002`
        - `app3` is accessible at `http://localhost:3003`
    - All applications depend on the Redis service and are connected to a common network (`dapr-network`).

### Redis
- **redis**:
    - Runs a Redis server based on the `redis:alpine` image.
    - Exposes port 6379 for Redis interactions.
    - Part of the `dapr-network`.

### Dapr
- **dapr**:
    - Runs the Dapr runtime using the `daprio/daprd:edge` image.
    - Configured with the command to start Dapr, including:
        - Application ID: `app`
        - HTTP port: `3500`
        - Path to the components directory.
    - Exposes port 3500 for Dapr HTTP API access.
    - Mounts a volume (`./components/:/components`) for Dapr components configuration.
    - Uses the environment variable `DAPR_API_TOKEN` for security.

## Network Configuration

- **dapr-network**:
    - A user-defined bridge network that allows all services to communicate seamlessly with each other.

## Usage

1. **Build and Start Containers**:
   Run the following command to build the Docker images and start all services:
   ```bash
   docker-compose up --build
