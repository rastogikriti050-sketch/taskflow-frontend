# 🚀 TaskFlow Frontend

A modern, responsive task management web application frontend built with React.  
TaskFlow provides a clean, intuitive interface for managing tasks with secure authentication and persistent user sessions.

## ✨ Features

### 🔐 Authentication System
- Secure Signup & Login
- JWT based authentication
- Persistent sessions
- Protected dashboard routes

### 🧩 User Experience
- Clean & modern UI
- Responsive design for all devices
- Smooth transitions and animations
- Error handling with user-friendly messages

### 📊 Dashboard
- Personal dashboard for each user
- Session-based navigation
- Protected content visibility

## 🛠️ Built With

- React 18  
- TypeScript  
- Vite  
- Tailwind CSS  
- Axios  
- React Router  

## 🚀 Local Setup

```bash
git clone https://github.com/<your-username>/taskflow-frontend.git
cd taskflow-frontend
npm install
npm run dev

```
## Project Structure
src/

├── components/

├── contexts/

├── hooks/

├── pages/

├── lib/

└── main.tsx

## 🧪 Environment Variables

Create a `.env` file in the root of the frontend project and add:

VITE_API_URL=http://localhost:5000/api


> ⚠️ Do not commit your `.env` file.  
Add `.env` to your `.gitignore`.

---

## 🧬 Backend Connection

Make sure your backend server is running on:

http://localhost:5000/

The frontend automatically connects to the backend using the `VITE_API_URL`.

---

## 🧭 Build for Production

```bash
npm run build


## add your own ip in the backend to connnect