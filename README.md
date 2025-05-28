
# Proyecto CRUD Productos y Usuarios (Frontend + Backend)

## 📌 Descripción general

Este proyecto es una aplicación fullstack desarrollada como trabajo práctico integrador. Consta de:

- *Backend (Node.js + Express + JSON):* gestiona rutas, controladores y almacenamiento persistente en archivos `.json` para productos y usuarios.
- *Frontend (React + Bootstrap):* interfaz amigable donde se realizan operaciones CRUD y exportación de datos a PDF.

---

## 📁 Estructura del proyecto

```
/backend
  ├── controllers/
  │   ├── productos.controller.js
  │   └── usuarios.controller.js
  ├── data/
  │   ├── productos.json
  │   └── usuarios.json
  ├── routes/
  │   ├── productos.routes.js
  │   └── usuarios.routes.js
  └── index.js

/frontend
  ├── public/
  └── src/
      ├── components/
      │   ├── Home.jsx
      │   ├── Productos.jsx
      │   └── Usuarios.jsx
      ├── App.jsx
      ├── App.css
      └── main.jsx
```

---

## 🧩 Funcionalidades

✅ CRUD completo para *Productos* y *Usuarios*  
✅ Conexión entre frontend y backend mediante Axios  
✅ Exportación de datos a PDF (nombre y precio en productos; nombre, email y edad en usuarios)
✅ Componentes separados para productos y usuarios

---

## 🚀 Instrucciones para correr el proyecto

### 1. Clonar el repositorio

git clone https://github.com/brunopesce23/PESCE-API
cd PESCE-API

### 2. Backend

cd backend
npm install
node index.js

Servidor backend disponible en: http://localhost:3001

### 3. Frontend

cd frontend
npm install
npm run dev

Aplicación frontend disponible en: http://localhost:5173

---

## 🛠️ Tecnologías utilizadas

*Backend:*
- Node.js
- Express
- fs (persistencia en JSON)
- CORS

*Frontend:*
- React con Vite
- Axios
- React Bootstrap
- jsPDF y jsPDF-AutoTable

---

## 📝 Consigna cumplida

- CRUD funcional para productos y usuarios
- Persistencia con JSON
- Frontend comunica con backend vía Axios
- Exportación a PDF desde el frontend

- Diseño organizado y visualmente claro

---
