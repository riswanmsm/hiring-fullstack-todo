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

### Installation & Run (while inside server directory run the below commands)
```bash
# Install dependencies
npm install

# Run in development mode (hot reloading via nodemon)
npm run dev

# Run in production mode
npm start

# Run automated test suite (in-memory MongoDB)
npm test
```

## API Endpoints Reference

All endpoints conform 1:1 to the contract specification defined in `docs/api-spec.md`.

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/todos` | Retrieve all TODOs sorted by `createdAt` descending | `200 OK` |
| `POST` | `/api/todos` | Create a new TODO item (requires valid `title`) | `201 Created`, `400 Bad Request` |
| `PUT` | `/api/todos/:id` | Update title and/or description | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `PATCH` | `/api/todos/:id/done` | Toggle boolean completion status | `200 OK`, `404 Not Found` |
| `DELETE` | `/api/todos/:id` | Delete a TODO item | `200 OK`, `404 Not Found` |
