# Inventory Management System (Medusa + React)

## Overview

Inventory management system for **Thob Builder** - a 3D platform integration. Built with **MedusaJS v2 (backend)** and **React + Vite (frontend)**.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | MedusaJS v2, Node.js, PostgreSQL |
| Frontend | React (Vite), Tailwind CSS |

---

## Key Design Decision

> This system uses Medusa's built-in **Product module** as the inventory model, extended using **metadata** for flexibility and faster development.

---

## Project Structure

```
InventoryforTHOB/
|
|-- backend/
|   |-- src/
|   |   |-- api/
|   |   |   |-- admin/inventory/     # Admin CRUD endpoints
|   |   |   |   |-- route.ts         # GET, POST
|   |   |   |   `-- [id]/route.ts    # GET, PUT, DELETE
|   |   |   `-- store/inventory/     # Public read endpoints
|   |   |       |-- route.ts         # GET
|   |   |       `-- [id]/route.ts    # GET
|   |   `-- index.ts
|   |-- medusa-config.js
|   |-- .env
|   `-- package.json
|
|-- frontend/
|   |-- src/
|   |   |-- assets/
|   |   |   `-- hero.png
|   |   |-- App.jsx
|   |   |-- App.css
|   |   |-- main.jsx
|   |   `-- index.css
|   |-- public/
|   |   `-- favicon.svg
|   |-- index.html
|   |-- vite.config.js
|   |-- eslint.config.js
|   `-- package.json
|
`-- README.md
```

---

## API Endpoints

### Admin Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/inventory` | List all inventory items |
| GET | `/admin/inventory/:id` | Get single inventory item |
| POST | `/admin/inventory` | Create inventory item |
| PUT | `/admin/inventory/:id` | Update inventory item |
| DELETE | `/admin/inventory/:id` | Delete inventory item |

### Store Endpoints (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/store/inventory` | List all inventory items |
| GET | `/store/inventory/:id` | Get single inventory item |

---

## Data Model

```typescript
InventoryItem (via Medusa Product) {
  id: string
  title: string
  description?: string
  thumbnail?: string

  metadata: {
    type: "3d_model" | "material" | "template"
    progress_status: "not_started" | "in_progress" | "completed"
    builder_link?: string
  }

  created_at: Date
  updated_at: Date
}
```

---

## Getting Started

### 1. Clone & Setup

```bash
git clone <repo-url>
cd InventoryforTHOB
```

### 2. Backend

```bash
cd backend
cp .env.example .env    # Configure DATABASE_URL
npm install
npm run dev
```

Runs at: `http://localhost:9000`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at: `http://localhost:5173`

---

## Status

**Backend Boilerplate Complete** - CRUD endpoints using Medusa Product module.
**Frontend In Progress** - UI needs to be built.

---

## Roadmap

- [x] Admin CRUD endpoints
- [x] Store read endpoints
- [ ] Inventory list UI
- [ ] Add/Edit inventory forms
- [ ] Status tracking
- [ ] Thob Builder integration
- [ ] Asset/Material/Template libraries

---

## License

MIT
