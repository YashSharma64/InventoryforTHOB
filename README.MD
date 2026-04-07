# 🚀 Inventory Management System (Medusa + React)

## 📌 Overview

This project is a **basic inventory management boilerplate** built using **MedusaJS (backend)** and **React + Tailwind CSS (frontend)**.

The system allows users to:

* Create and manage inventory items
* Track progress/status of items
* Store additional metadata (like type, builder link)
* Prepare data for future integration with a **3D Builder platform (Thob Builder)**

---

## 🧠 Concept

Instead of building a system from scratch, this project uses:

> **Medusa Products = Inventory Items**

Custom fields are handled using **metadata**, making the system flexible and scalable.

---

## 🏗️ Tech Stack

### Backend

* MedusaJS
* Node.js
* PostgreSQL

### Frontend

* React (Vite)
* Tailwind CSS

---

## 📁 Project Structure

```bash
inventory-system/
│
├── backend/                # Medusa backend
│   ├── src/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── admin/
│   │   │       │   └── inventory.ts
│   │   │       └── store/
│   │   │           └── inventory.ts
│   │   └── index.ts
│   ├── medusa-config.js
│   └── package.json
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── InventoryCard.jsx
│   │   │   ├── InventoryForm.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Features

### ✅ Inventory Management

* Add new inventory items
* View all items
* Update item status

### ✅ Metadata Support

Each inventory item includes:

```json
{
  "type": "3d_model",
  "progress_status": "in_progress",
  "builder_link": ""
}
```

---

### ✅ API Endpoints

#### Default Medusa APIs

* `GET /store/products`
* `GET /store/products/:id`
* `POST /admin/products`

#### Custom APIs

* `POST /admin/inventory` → create inventory item
* `GET /store/inventory` → fetch all inventory

---

## 🖥️ Frontend (Dashboard)

Single-page dashboard includes:

* Inventory list
* Add item form
* Status display
* Builder link (if completed)

---

## 🔄 Data Flow

```bash
React Frontend
     ↓
Medusa API (Products)
     ↓
PostgreSQL Database
     ↓
Response to UI
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd inventory-system
```

---

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:9000
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🧪 Testing

### Create Inventory

```
POST /admin/inventory
```

### Get Inventory

```
GET /store/inventory
```

---

## 🔮 Future Enhancements

* Asset Library (3D models)
* Material Library (textures)
* Template Library (pre-built scenes)
* Authentication system
* Advanced filtering & search
* Integration with Thob 3D Builder

---

## 💡 Key Design Decision

> Instead of creating custom database models, this project leverages Medusa’s product system and extends it using metadata for flexibility and faster development.

---

## 🤝 Contribution

This is a boilerplate project. Contributions and improvements are welcome.

---

## 📄 License

MIT License
