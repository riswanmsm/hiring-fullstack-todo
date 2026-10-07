# Full-Stack TODO Application (Spec-Driven Architecture)

A production-ready full-stack task management platform built strictly against the provided REST API specifications and Mongoose schema contracts.

## Video Walkthrough & Live Demo
- 📺 **YouTube Video Walkthrough:** [https://youtu.be/HEO0IK3XMLU](https://youtu.be/HEO0IK3XMLU)
  - **Live UI Demo:** Task creation, in-place editing modal, optimistic completion toggle, delete confirmation dialog.
  - **Error & Resilience Handling:** Full-page interaction-blocking loader, network timeout resilience, user-friendly error feedback.
  - **Codebase Walkthrough:** End-to-end layered architecture (`server.js` &rarr; `app.js` &rarr; `routes` &rarr; `validators` &rarr; `controllers` &rarr; `services` &rarr; `models`).
  - **Automated Tests:** 11/11 Jest integration tests passing against in-memory MongoDB.

## Architecture & Engineering Rationale
- **Spec-Driven Development (SDD):** Endpoints and data models adhere 1:1 with specifications (`GET`, `POST`, `PUT`, `PATCH /done`, `DELETE`).
- **Test-Driven Development (TDD):** Automated integration tests written with Jest, Supertest, and an in-memory MongoDB runner to validate behavior and edge cases without third-party database dependencies.
- **Layered Backend Architecture:** Separation of concerns dividing routes, perimeter validation, HTTP controllers, and pure business services.
- **Optimistic UI with Rollback:** State mutations (status toggling and deletion) apply instantly on the client and revert automatically to prior state snapshots upon network rejection.
- **Monorepo Workspace:** Single-command local environment orchestration utilizing `concurrently`.

## Repository Directory Structure
hiring-fullstack-todo/
├── client/          # React + Vite frontend with Tailwind CSS
│   ├── README.md    # Frontend run guide and specifications
├── server/          # Node.js + Express backend with Mongoose
│   ├── README.md    # Backend run guide, DB connection, and API reference
├── docs/            # SDD API contracts and specifications
├── package.json     # Monorepo root scripts
└── README.md        # System architecture overview

## Quick Start (Run Both Services Concurrently)

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)
- MongoDB instance (local service or MongoDB Atlas connection string)

### 1. Installation
Clone the repository and install root and workspace dependencies:
```bash
git clone <repository-url>
cd hiring-fullstack-todo
npm install
npm --prefix server install
npm --prefix client install
```

### 2. Configure Environment Variables
Copy environment samples in both subdirectories:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 3. Launch Development Environment
Run both backend (http://localhost:5000) and frontend (http://localhost:5173) using concurrently while on root directory:
```bash
npm run dev
```

### 4. Run Automated Tests
Execute full integration test suite covering API contracts, database interactions, and edge cases while on root directory:
```bash
npm test
```
Execute the backend integration test harness:
```bash
npm run test:server
```

