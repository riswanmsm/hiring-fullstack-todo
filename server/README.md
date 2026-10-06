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

---

## MongoDB Connection Notes

The backend dynamically configures its database connection via the `MONGODB_URI` environment variable defined in `.env`:

### 1. Local MongoDB Service
If running MongoDB as a local system service (default port `27017`):
```env
MONGODB_URI=mongodb://127.0.0.1:27017/todo-db
```

### 2. Docker Container
If running MongoDB via Docker:
```bash
docker run -d --name todo-mongo -p 27017:27017 mongo:latest
```
```env
MONGODB_URI=mongodb://127.0.0.1:27017/todo-db
```

### 3. MongoDB Atlas (Cloud)
To connect to a managed cloud cluster, provide your standard connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/todo-db?retryWrites=true&w=majority
```

### 4. Automated Test Isolation
Automated tests (`npm test`) do **not** require a running MongoDB instance. The test suite automatically boots an isolated, temporary in-memory instance via `mongodb-memory-server` and tears it down after test completion.

---

## Data Model (Mongoose)

Defined in `src/models/Todo.js`:
- `_id`: ObjectId (Auto-generated unique identifier)
- `title`: String (Required, trimmed, non-empty)
- `description`: String (Optional, trimmed, default: `""`)
- `done`: Boolean (Default: `false`)
- `createdAt`: ISO Timestamp (Auto-generated via `timestamps: true`)
- `updatedAt`: ISO Timestamp (Auto-generated via `timestamps: true`)
- **Index:** Single index `{ createdAt: -1 }` optimizing sorting performance for newest-first queries.

---

## Assumptions & Limitations

1. **Single-Tenant Scope:** As specified by the prompt, user authentication, authorization, and multi-tenant user isolation were intentionally omitted to maintain focus on core CRUD capabilities.
2. **Hard Deletion:** Deletion (`DELETE /api/todos/:id`) permanently removes the document from MongoDB rather than soft-deleting with an `isDeleted` flag.
3. **Result Set Size:** Per the specification contract (`GET /api/todos`), all tasks are returned sorted descending by creation timestamp without server-side pagination, assuming typical personal task volume.
4. **Input Sanitization:** While string length is not bounded to a hard maximum, leading and trailing whitespace are trimmed automatically across title and description.
5. **Transitive Dependency Override:** An npm override (`chokidar: ^4.0.3`) is maintained in `package.json` to eliminate upstream Denial of Service vulnerability `CVE-2026-93687` in dev dependencies without breaking hot-reload workflows.
