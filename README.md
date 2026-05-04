# 🚀 Team Task Manager (MERN Stack)

A full-stack **Team Task Management Web Application** built using the MERN stack.
This app allows teams to manage projects, assign tasks, track progress, and collaborate efficiently.

---

## 🌐 Live Demo

* 🔗 Frontend (Netlify): https://team-task-manageretha.netlify.app
* 🔗 Backend (Render): https://team-task-manager-dv0m.onrender.com

---

## 📌 Features

### 👤 Authentication

* User Signup & Login (JWT-based)
* Secure token-based authentication

### 📁 Project Management

* Create and manage projects
* Assign team members to projects

### ✅ Task Management

* Create, update, delete tasks
* Assign tasks to users
* Set due dates
* Drag & Drop task management (Kanban-style)

### 👥 User Management

* View team members
* Assign tasks to specific users

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* React Router DOM
* Framer Motion
* DnD Kit (Drag & Drop)

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* JWT Authentication

### Deployment

* Frontend: Netlify
* Backend: Render

---

## 📁 Project Structure

```
TeamTaskManager/
├── frontend/        # React (Vite)
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/         # Node + Express
│   ├── src/
│   │   ├── routes/
│   │   ├── config/
│   │   └── app.js
│   └── server.js
```

---

## ⚙️ Environment Variables

### 📁 Frontend (.env)

```
VITE_API_URL=https://team-task-manager-dv0m.onrender.com
```

---

### 📁 Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/vishal1722/team-task-manager.git
cd team-task-manager
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔧 Build for Production

```bash
cd frontend
npm run build
```

---

## 🌍 Deployment Guide

### Frontend (Netlify)

* Base Directory: `frontend`
* Build Command: `npm run build`
* Publish Directory: `dist`

### Backend (Render)

* Root Directory: `backend`
* Build Command: `npm install`
* Start Command: `node server.js`

---

## 🔐 API Endpoints (Sample)

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | /api/auth/login  | Login user       |
| POST   | /api/auth/signup | Register user    |
| GET    | /api/projects    | Get all projects |
| POST   | /api/tasks       | Create new task  |
| GET    | /api/users       | Get users        |

---

## 🧠 Learnings

* Full-stack MERN architecture
* Authentication with JWT
* REST API design
* Deployment on Netlify & Render
* State management and UI design

---

## 📌 Future Improvements

* Role-based access control (Admin/User)
* Notifications system
* Real-time updates (WebSockets)
* File attachments for tasks

---

## 👨‍💻 Author

**Vishal Thakare**
B.Tech CSE (Data Science)
Aspiring Software Development Engineer 🚀

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
