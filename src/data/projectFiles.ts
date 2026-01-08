export const projectFiles = {
  // Backend files
  "backend/package.json": {
    language: "json",
    code: `{
  "name": "autodeploy-backend",
  "version": "1.0.0",
  "description": "Simple Express backend for AutoDeploy Hub",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}`
  },

  "backend/server.js": {
    language: "javascript",
    code: `// Simple Express server for AutoDeploy Hub
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is running'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
  },

  "backend/Dockerfile": {
    language: "dockerfile",
    code: `# Backend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]`
  },

  // Frontend files
  "frontend/package.json": {
    language: "json",
    code: `{
  "name": "autodeploy-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}`
  },

  "frontend/vite.config.js": {
    language: "javascript",
    code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});`
  },

  "frontend/src/App.jsx": {
    language: "jsx",
    code: `import { useState } from 'react';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/health');
      const data = await response.json();
      setHealth(data);
    } catch (error) {
      setHealth({ status: 'error', message: error.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      backgroundColor: '#1a1a2e',
      color: '#eee'
    }}>
      <h1>AutoDeploy Hub</h1>
      <p>CI/CD Demo Project</p>
      
      <button 
        onClick={checkHealth}
        disabled={loading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#4ade80',
          color: '#1a1a2e',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        {loading ? 'Checking...' : 'Check Backend Health'}
      </button>

      {health && (
        <pre style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#252540',
          borderRadius: '8px'
        }}>
          {JSON.stringify(health, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;`
  },

  "frontend/src/main.jsx": {
    language: "jsx",
    code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  },

  "frontend/index.html": {
    language: "html",
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AutoDeploy Hub</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
  },

  "frontend/Dockerfile": {
    language: "dockerfile",
    code: `# Frontend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]`
  },

  // Docker Compose
  "docker-compose.yml": {
    language: "yaml",
    code: `# Docker Compose configuration
# Runs both frontend and backend together

version: '3.8'

services:
  # Backend service
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
    networks:
      - app-network

  # Frontend service  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge`
  },

  // GitHub Actions
  ".github/workflows/ci-cd.yml": {
    language: "yaml",
    code: `# GitHub Actions CI/CD Pipeline
# Triggers on push to main branch

name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      # Step 1: Checkout code
      - name: Checkout repository
        uses: actions/checkout@v4

      # Step 2: Set up Docker Buildx
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # Step 3: Build Docker containers
      - name: Build containers
        run: docker-compose build

      # Step 4: Run containers
      - name: Start services
        run: docker-compose up -d

      # Step 5: Wait for services
      - name: Wait for backend
        run: sleep 10

      # Step 6: Health check
      - name: Test backend health
        run: curl -f http://localhost:5000/health

      # Step 7: Cleanup
      - name: Stop services
        run: docker-compose down`
  },

  // README
  "README.md": {
    language: "markdown",
    code: `# AutoDeploy Hub

A beginner-friendly project demonstrating CI/CD with Docker and GitHub Actions.

## What is this project?

This project teaches you how to:
- Build a simple web app with React and Express
- Package apps using Docker containers
- Automate deployments with GitHub Actions

## Project Structure

\`\`\`
autodeploy-hub/
├── frontend/          # React app (Vite)
├── backend/           # Express.js server
├── docker-compose.yml # Run both services
├── .github/workflows/ # CI/CD automation
└── README.md
\`\`\`

## How to Run Locally

### Option 1: With Docker (Recommended)

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd autodeploy-hub

# Start both services
docker-compose up --build

# Open browser
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000/health
\`\`\`

### Option 2: Without Docker

\`\`\`bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
\`\`\`

## Understanding CI/CD

**CI (Continuous Integration):**
Every time you push code, automated tests run to catch bugs early.

**CD (Continuous Deployment):**
When tests pass, your app automatically deploys to production.

### How GitHub Actions Works

1. You push code to GitHub
2. GitHub detects the push
3. It reads \`.github/workflows/ci-cd.yml\`
4. It runs your defined steps (build, test, deploy)
5. You get notified if something fails

## Technologies Used

- **React + Vite** - Fast frontend development
- **Express.js** - Simple Node.js backend
- **Docker** - Container packaging
- **GitHub Actions** - CI/CD automation

## Next Steps

1. Fork this repository
2. Make a small change
3. Push and watch GitHub Actions run!

---
Made for learning CI/CD 🚀`
  }
};
