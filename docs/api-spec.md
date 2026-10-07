# API Contract Specification

## Data Model (Mongoose)
- `_id`: String / ObjectId
- `title`: String (Required, non-empty, trimmed)
- `description`: String (Optional, trimmed, default: "")
- `done`: Boolean (Default: false)
- `createdAt`: ISO Timestamp (Auto-generated)
- `updatedAt`: ISO Timestamp (Auto-generated)

## Endpoints
1. `GET /api/todos` -> Returns all TODOs sorted by `createdAt` descending (200 OK)
2. `POST /api/todos` -> Creates a TODO; requires valid `title` (201 Created, 400 Bad Request)
3. `PUT /api/todos/:id` -> Updates title and/or description (200 OK, 400 Bad Request, 404 Not Found)
4. `PATCH /api/todos/:id/done` -> Toggles boolean status (200 OK, 404 Not Found)
5. `DELETE /api/todos/:id` -> Deletes a TODO item (200 OK, 404 Not Found)