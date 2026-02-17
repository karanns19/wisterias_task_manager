# Task Manager - Wisterias

A Task Management dashboard built with the modern web stack.

---

## 🏗 Architecture Overview

The project is structured with a strict separation of concerns to ensure maintainability and production readiness.

### 🌐 Frontend (Next.js)
- **`app/`**: Next.js App Router for layouts and primary views.
- **`components/`**: Atomic UI components (TaskCard, TaskForm, Loader, etc.) built with Tailwind CSS.
- **`hooks/`**: Custom hooks (e.g., `useTasks`) managing state and business logic orchestration.
- **`services/`**: Centralized API communication layer using Axios.
- **`utils/`**: Helper functions for validation and conditional class merging.

### 🔌 Backend (Node/Express)
- **Standardized API**: All endpoints return a consistent `{ success: boolean, data: ... }` format.
- **Controllers**: Logic-focused request handlers with full async error tracking.
- **Middleware**: Global `errorHandler` and CORS integration.
- **Services**: Business logic decoupled from transportation layers.
- **Testing**: Comprehensive API test suite using Jest and Supertest.

---

## 🚀 Key Features

- **Premium SaaS UI**: Dark tech aesthetic with glassmorphism, tailored scrollbars, and background glows.
- **Smart Diagnostics**: Real-time productivity stats (Total, Resolved, Active counts).
- **Advanced UX**:
  - Smooth hover animations and staggered list transitions (Framer Motion).
  - Button loading states ("ADDING...") and disabled modes during submission.
  - Robust error handling with dedicated UI states (Error/Empty/Loading).
- **Search & Filtering**: Instant title-based search and status filtering (Overview/Active/Resolved).
- **Testing Suite**: 7+ standardized API tests covering CRUD and validation.

---

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Middleware**: CORS, Custom Error Handler
- **Architecture**: Service-Oriented (SOC)

### Testing
- **Framework**: Jest
- **Integration**: Supertest

---

## ⚙️ Setup Instructions

### 1️⃣ Clone and Prepare
```bash
git clone <your-repo-link>
cd "Wisterias Task Manager"
```

### 2️⃣ Initialize Backend
```bash
cd backend
npm install
npm run dev
```
*Backend runs on: `http://localhost:5000`*

### 3️⃣ Initialize Frontend
```bash
# In a new terminal
cd frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:3000`*

---

## 🧪 Running Tests

Validate the backend API integrity:
```bash
cd backend
npm test
```
*Current Status: 7 Passed, 0 Failed*

---
