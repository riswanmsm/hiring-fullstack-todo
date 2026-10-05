# Server - Hiring FullStack TODO API

RESTful API backend for the TODO platform built with Node.js, Express, and Mongoose.

## Architecture

Follows a strict layered architecture:
- **Routes:** Endpoint definition and route-to-controller mapping (`src/routes/`)
- **Validators:** Schema and request body validation (`src/validators/`)
- **Controllers:** Request/response orchestration and HTTP status codes (`src/controllers/`)
- **Services:** Core business logic and database interactions (`src/services/`)
- **Models:** Mongoose schemas and data persistence (`src/models/`)

## Getting Started

### Prerequisites
- Node.js >= 20.x
- MongoDB instance (or local connection string via `.env`)

### Installation & Run
```bash
# Install dependencies
npm install

# Run in development mode (hot reloading via nodemon)
npm run dev

# Run in production mode
npm start

# Run automated test suite (in-memory MongoDB)
npm test
