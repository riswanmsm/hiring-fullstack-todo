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
│   ├── TodoEditModal.jsx   # Dialog modal for updating title & description
│   └── Toast.jsx           # Auto-dismissing error toast notification
├── hooks/
│   └── useTodos.js         # Centralized state & optimistic rollback logic
├── services/
│   └── todoApi.js          # Axios API client matching backend contract
├── App.jsx                 # Layout orchestration & progress metrics
├── index.css               # Tailwind CSS v4 entrypoint
└── main.jsx                # Application root entry