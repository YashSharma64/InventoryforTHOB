# 🚀 Inventory Management System (Medusa + React)

## Overview

Inventory management system for **Thob Builder** - a 3D platform integration. Built with **MedusaJS (backend)** and **React + Vite (frontend)**.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | MedusaJS, Node.js, PostgreSQL |
| Frontend | React (Vite), Tailwind CSS |

---

## Project Structure

```
InventoryforTHOB/
|
|-- backend/
|   |-- src/
|   |   |-- api/routes/
|   |   |   |-- admin/inventory.ts
|   |   |   `-- store/inventory.ts
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

### Custom Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/inventory` | Create inventory item |
| GET | `/store/inventory` | Fetch all inventory |

### Default Medusa APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/store/products` | List products |
| GET | `/store/products/:id` | Get product by ID |
| POST | `/admin/products` | Create product |

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

**In Development** - Backend routes are set up. Frontend UI needs to be built.

---

## Roadmap

- [ ] Inventory list UI
- [ ] Add/Edit inventory forms
- [ ] Status tracking
- [ ] Thob Builder integration
- [ ] Asset/Material/Template libraries

---

## License

MIT
