# AutoDeploy Hub 🚀

A **fully functional, production-ready** full-stack application demonstrating CI/CD with Docker and GitHub Actions. Perfect for learning DevOps concepts through hands-on practice.

![AutoDeploy Hub](https://img.shields.io/badge/Status-Production%20Ready-success)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Local Development](#local-development)
- [Docker Commands](#docker-commands)
- [GitHub Actions CI/CD](#github-actions-cicd)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

AutoDeploy Hub is a complete full-stack application that demonstrates:

- **Frontend**: React app with TypeScript, Vite, and Tailwind CSS
- **Backend**: Express.js REST API with health monitoring
- **Docker**: Containerized services with Docker Compose
- **CI/CD**: Automated testing and deployment with GitHub Actions

This is **NOT a demo** - it's a fully working application you can run locally and deploy to production.

## ✨ Features

- ✅ **Real Backend API** - Express.js server with `/health` endpoint
- ✅ **Interactive Frontend** - React UI that calls real backend APIs
- ✅ **Docker Containerization** - Both services run in isolated containers
- ✅ **Docker Compose** - One command to start everything
- ✅ **Health Checks** - Automated container health monitoring
- ✅ **CI/CD Pipeline** - GitHub Actions workflow for automated testing
- ✅ **Production Ready** - Security best practices, error handling, logging
- ✅ **Windows Compatible** - Tested on Windows with Docker Desktop

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **nginx** - Production web server

### Backend
- **Node.js 20** - Runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin support
- **dotenv** - Environment configuration

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD automation
- **nginx** - Reverse proxy and static file serving

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

1. **Docker Desktop for Windows**
   - Download: https://www.docker.com/products/docker-desktop
   - Version: 4.0 or higher
   - Make sure Docker is running before proceeding

2. **Git**
   - Download: https://git-scm.com/download/win
   - For cloning the repository

3. **Node.js** (Optional - only for local development without Docker)
   - Download: https://nodejs.org/
   - Version: 20.x or higher

## 🚀 Quick Start

### Option 1: Run with Docker (Recommended)

This is the easiest way to get started. Docker will handle everything.

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd autodeploy-hub-main

# 2. Start the application
docker-compose up --build

# 3. Access the application
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
```

That's it! The application is now running. Open your browser to `http://localhost:3000` and click "Check Backend Health" to see it in action.

### Option 2: Run Locally (Development)

If you want to develop without Docker:

```bash
# 1. Install backend dependencies
cd backend
npm install
npm start

# 2. In a new terminal, install frontend dependencies
cd ..
npm install
npm run dev

# Frontend will be at http://localhost:5173
# Backend will be at http://localhost:5000
```

## 📁 Project Structure

```
autodeploy-hub-main/
├── backend/                    # Backend service
│   ├── server.js              # Express server with /health endpoint
│   ├── package.json           # Backend dependencies
│   ├── Dockerfile             # Backend container configuration
│   ├── .dockerignore          # Files to exclude from Docker build
│   └── .env.example           # Environment variable template
│
├── src/                       # Frontend source code
│   ├── components/            # React components
│   │   └── HealthDemo.tsx    # Component that calls backend API
│   ├── pages/                # Page components
│   ├── App.tsx               # Main app component
│   └── main.tsx              # App entry point
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions CI/CD pipeline
│
├── Dockerfile                 # Frontend container configuration
├── docker-compose.yml         # Multi-container orchestration
├── nginx.conf                 # nginx web server configuration
├── package.json              # Frontend dependencies
├── index.html                # HTML entry point
└── README.md                 # This file
```

## 🔧 How It Works

### Architecture Overview

```
┌─────────────┐         ┌─────────────┐
│   Browser   │────────▶│  Frontend   │
│             │         │  (Port 3000)│
└─────────────┘         └──────┬──────┘
                               │
                               │ HTTP Request
                               │
                        ┌──────▼──────┐
                        │   Backend   │
                        │  (Port 5000)│
                        └─────────────┘
```

### Frontend → Backend Communication

1. **User clicks** "Check Backend Health" button
2. **Frontend** sends HTTP GET request to `http://localhost:5000/health`
3. **Backend** processes the request and returns JSON:
   ```json
   {
     "status": "ok",
     "message": "Backend is running",
     "time": "2026-01-08T05:24:43.000Z"
   }
   ```
4. **Frontend** displays the response to the user

### Docker Networking

When running with Docker Compose:

- Both containers run on a custom bridge network called `app-network`
- Containers can communicate using service names
- Frontend is accessible at `http://localhost:3000` (mapped from container port 80)
- Backend is accessible at `http://localhost:5000` (mapped from container port 5000)
- Health checks ensure services are ready before accepting traffic

### CI/CD Pipeline Flow

```
Push to GitHub (main branch)
    ↓
GitHub Actions Triggered
    ↓
1. Checkout Code
    ↓
2. Build Docker Images
    ↓
3. Start Services (docker-compose up)
    ↓
4. Wait for Health Checks
    ↓
5. Test Backend API
    ↓
6. Test Frontend Accessibility
    ↓
7. Show Logs
    ↓
8. Cleanup
```

## 📡 API Documentation

### GET /health

Health check endpoint for the backend service.

**Request:**
```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running",
  "time": "2026-01-08T05:24:43.000Z"
}
```

**Status Code:** `200 OK`

### GET /

Root endpoint providing API information.

**Response:**
```json
{
  "message": "AutoDeploy Hub Backend API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health"
  }
}
```

## 💻 Local Development

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend will run on `http://localhost:5173` (Vite default)

### Environment Variables

**Backend** (create `backend/.env`):
```env
PORT=5000
NODE_ENV=development
```

**Frontend** (create `.env`):
```env
VITE_API_URL=http://localhost:5000
```

## 🐳 Docker Commands

### Basic Commands

```bash
# Build and start all services
docker-compose up --build

# Start services in detached mode (background)
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f

# Rebuild a specific service
docker-compose build backend
docker-compose build frontend

# Restart a service
docker-compose restart backend
```

### Debugging Commands

```bash
# List running containers
docker ps

# Inspect container
docker inspect autodeploy-backend
docker inspect autodeploy-frontend

# Execute command in running container
docker exec -it autodeploy-backend sh
docker exec -it autodeploy-frontend sh

# View container resource usage
docker stats

# Check container health
docker inspect --format='{{.State.Health.Status}}' autodeploy-backend
```

## 🔄 GitHub Actions CI/CD

### Setup Instructions

1. **Create a GitHub Repository**
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit: AutoDeploy Hub"
   
   # Add remote repository
   git remote add origin <your-github-repo-url>
   
   # Push to GitHub
   git push -u origin main
   ```

2. **GitHub Actions Will Automatically Run**
   - Navigate to your repository on GitHub
   - Click on the "Actions" tab
   - You'll see the workflow running
   - Each step will show green checkmarks when successful

3. **View Workflow Results**
   - Click on any workflow run to see details
   - Expand each step to see logs
   - Failed steps will show error messages

### Workflow Triggers

The CI/CD pipeline runs on:
- Push to `main` branch
- Pull requests to `main` branch
- Manual trigger (workflow_dispatch)

### What the Pipeline Does

1. ✅ Checks out your code
2. ✅ Sets up Docker Buildx
3. ✅ Builds backend Docker image
4. ✅ Builds frontend Docker image
5. ✅ Starts services with docker-compose
6. ✅ Waits for health checks to pass
7. ✅ Tests backend `/health` endpoint
8. ✅ Tests frontend accessibility
9. ✅ Shows container logs
10. ✅ Cleans up resources

## 🔍 Troubleshooting

### Docker Issues

**Problem:** "Docker daemon is not running"
```bash
# Solution: Start Docker Desktop
# Open Docker Desktop application and wait for it to start
```

**Problem:** "Port already in use"
```bash
# Solution: Stop the service using the port
# For port 3000:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# For port 5000:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change ports in docker-compose.yml
```

**Problem:** "Cannot connect to backend"
```bash
# Solution: Check if backend is running
docker-compose logs backend

# Restart backend
docker-compose restart backend

# Check backend health
curl http://localhost:5000/health
```

### Build Issues

**Problem:** "npm install fails"
```bash
# Solution: Clear npm cache and rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

**Problem:** "Frontend shows blank page"
```bash
# Solution: Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose build frontend
docker-compose up
```

### Network Issues

**Problem:** "Frontend can't reach backend"
```bash
# Solution: Verify both containers are on same network
docker network inspect autodeploy-hub-main_app-network

# Verify backend is accessible
docker exec -it autodeploy-frontend wget -O- http://backend:5000/health
```

### Windows-Specific Issues

**Problem:** "Line ending issues (CRLF vs LF)"
```bash
# Solution: Configure git to handle line endings
git config --global core.autocrlf input

# Re-clone the repository
```

**Problem:** "Permission denied in containers"
```bash
# Solution: Ensure Docker Desktop has proper permissions
# Run Docker Desktop as Administrator
```

## 🎓 Learning Resources

- **Docker Documentation**: https://docs.docker.com/
- **Docker Compose**: https://docs.docker.com/compose/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/

## 📝 License

MIT License - feel free to use this project for learning and teaching!

## 🤝 Contributing

This is a learning project. Feel free to fork and modify for your own use!

## 📧 Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review Docker Desktop logs
3. Check GitHub Actions workflow logs
4. Ensure all prerequisites are installed

---

**Made with ❤️ for learning DevOps and CI/CD**

Happy Learning! 🚀
