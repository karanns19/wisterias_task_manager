# Task Manager Application

A simple full-stack Task Manager built with:

- Frontend: Next.js (React)
- Backend: Node.js + Express
- Testing: Jest & Supertest

This application allows users to create, search, filter, update, and delete tasks.

---

## 🏗 Architecture Overview

This project follows a clean separation of concerns:

task-manager/
│
├── backend/        → Express REST API
└── frontend/       → Next.js Client Application


### Backend Architecture

The backend follows a modular structure:

- routes → Defines API endpoints
- controllers → Handles request/response logic
- services → Business logic
- data → In-memory task storage
- app.js → Express configuration
- server.js → Application entry point

### Frontend Architecture

- components → Reusable UI components
- services → API communication layer
- app → Main Next.js pages

This structure keeps responsibilities separated and improves maintainability.

---

## 🚀 Features

- Add a new task
- View all tasks
- Delete a task
- Update task status (completed / pending)
- Search tasks by title
- Filter tasks by status
- Basic error handling
- API tests included

---

## 📦 Tech Stack

Frontend:
- Next.js
- React Hooks
- Fetch API

Backend:
- Node.js
- Express
- CORS

Testing:
- Jest
- Supertest

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd task-manager
```

---

### 2️⃣ Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:
http://localhost:5000

---

### 3️⃣ Run Frontend

Open new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:3000
