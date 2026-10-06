# Client - Full-Stack TODO Frontend
A modern, responsive task management interface built with **React 19**, **Vite**, and **Tailwind CSS v4**, featuring Spec-Driven API integration and optimistic UI updates.
---
## Architectural Highlights
- **Custom State Management (`useTodos` Hook):** All data fetching, state mutations, and API orchestration are cleanly decoupled from the UI layer into a dedicated custom hook (`src/hooks/useTodos.js`).
- **Optimistic UI with Snapshot Rollback:** Status toggling (`PATCH /api/todos/:id/done`) and deletions (`DELETE /api/todos/:id`) mutate state instantaneously. If the network request fails, state automatically reverts to a previous snapshot while triggering an error notification.
- **Defensive Error Handling:** Form-level validation prevents empty submissions, graceful skeleton loaders handle initial data retrieval, and an auto-dismissing toast alerts users to backend communication failures.
- **Tailwind CSS v4 & Lucide Icons:** Modern design system configured with `@tailwindcss/vite` and clean iconography.
---
## Component Architecture
```text
src/
├── components/
│   ├── TodoForm.jsx        # Task creation with client-side validation
│   ├── TodoList.jsx        # Empty state & item list rendering
│   ├── TodoItem.jsx        # Individual task with optimistic toggle & actions
│   ├── TodoEditModal.jsx       # Dialog modal for updating title & description
│   ├── DeleteConfirmModal.jsx  # Confirmation dialog for safe task deletion
│   └── Toast.jsx               # Auto-dismissing error toast notification
├── hooks/
│   └── useTodos.js         # Centralized state & optimistic rollback logic
├── services/
│   └── todoApi.js          # Axios API client matching backend contract
├── App.jsx                 # Layout orchestration & progress metrics
├── index.css               # Tailwind CSS v4 entrypoint
└── main.jsx                # Application root entry
```

---

## Getting Started

### Prerequisites
- Node.js >= 20.x
- Backend API running on `http://localhost:5000` (or configured via `.env`)

### Installation & Run (while inside `client` directory)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional, defaults to http://localhost:5000/api)
cp .env.example .env

# 3. Start local development server (with HMR)
npm run dev

# 4. Create production build
npm run build

# 5. Preview production build locally
npm run preview
```

---

## Environment Configuration

Configured via `client/.env`:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `http://localhost:5000/api` | Base URL for the backend REST API endpoints |

---

## Optimistic UI Pattern Walkthrough

State mutations in `src/hooks/useTodos.js` follow a defensive 4-step sequence:

1. **Snapshot Prior State:** Save an immutable copy of current tasks: `const previousTodos = [...todos];`
2. **Optimistic Mutation:** Immediately update state in React before dispatching the asynchronous HTTP call.
3. **Dispatch Network Request:** Send the request via `axios` (`src/services/todoApi.js`).
4. **Snapshot Rollback on Error:** If the server returns a 4xx/5xx status or network failure occurs:
   - State instantly reverts to `previousTodos`.
   - The auto-dismissing `<Toast />` component displays the server-provided error message.

---

## Assumptions & Limitations

1. **API Reachability:** Assumes the backend API is reachable at `VITE_API_URL`. If the backend is unreachable, the client handles errors gracefully with toast notifications and automatic state rollback rather than unhandled exceptions.
2. **Session Scope:** State is managed in React memory during the user session without client-side persistence (e.g. `localStorage`), relying on the backend MongoDB database as the single source of truth upon page reload.
3. **Responsive Viewport:** Optimized for modern desktop and mobile viewports with a centered container (`max-w-2xl`).
4. **CSS Compilation Pipeline:** Styled using the `@tailwindcss/vite` compiler plugin, requiring Vite for both development hot-reloading and production bundling.