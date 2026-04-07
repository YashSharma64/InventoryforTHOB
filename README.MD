# Inventory Management System for THOB

A basic inventory management system using MedusaJS backend and React frontend.

## Architecture

```
React UI
   downstream
Medusa API (/products)
   downstream
Product Table (acts as Inventory)
   downstream
metadata = custom inventory logic
```

## Core Concept

- **Medusa Product = Inventory Item** (no custom models)
- Use `product.metadata` for custom fields
- React frontend for viewing and managing inventory

## Data Structure

Each inventory item (Medusa product) contains:

```json
{
  "title": "Chair Model",
  "description": "Modern wooden chair",
  "status": "draft",
  "metadata": {
    "type": "3d_model",
    "progress_status": "in_progress",
    "builder_link": ""
  }
}
```

### Metadata Fields

| Field | Description | Values |
|-------|-------------|--------|
| `type` | Item type | `3d_model`, `asset`, `material`, etc. |
| `progress_status` | Current status | `in_progress`, `completed`, `draft` |
| `builder_link` | Link to builder | URL string |

## Project Structure

### Backend (MedusaJS)

```
backend/
medusa-config.js
package.json
.env
```

### Frontend (React + Vite)

```
frontend/
src/
  components/
    InventoryCard.jsx
    Navbar.jsx
  pages/
    InventoryList.jsx      # all products
    InventoryDetail.jsx    # single product
    AddInventory.jsx       # create product
  services/
    api.js                 # axios/fetch calls
  hooks/
    useInventory.js        # fetch logic
  App.jsx
  main.jsx
  index.css
```

## API Endpoints (Medusa Default)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/store/products` | List all inventory items |
| GET | `/store/products/:id` | Get single item |
| POST | `/admin/products` | Create new inventory item |
| POST | `/admin/products/:id` | Update item |

## Development Phases

### Phase 1 (Current)
- [x] Project setup
- [ ] MedusaJS backend setup
- [ ] Inventory system (CRUD)
- [ ] Progress logs
- [ ] API integration
- [ ] Basic UI

### Phase 2 (Future)
- [ ] Asset library
- [ ] Material library
- [ ] Template library

## Tech Stack

- **Backend**: MedusaJS
- **Frontend**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios/Fetch

## What This IS

A basic inventory management boilerplate that:
- Stores items (via Medusa products)
- Views inventory (React UI)
- Updates items (status, metadata, builder link)

## What This IS NOT

- Full warehouse management system
- Stock quantity tracking
- Supplier/order management

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

