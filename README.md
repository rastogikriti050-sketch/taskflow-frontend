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

<img width="1342" height="716" alt="signin" src="https://github.com/user-attachments/assets/4f616b6c-353b-4306-87ee-550a76ef551b" />

<img width="1330" height="714" alt="register" src="https://github.com/user-attachments/assets/d9461a76-5eaa-4c45-bf19-9e7648396562" />

<img width="1355" height="720" alt="front" src="https://github.com/user-attachments/assets/4d65cd68-79e1-43c8-a156-721eab32f4e6" />

<img width="1366" height="723" alt="dashboard" src="https://github.com/user-attachments/assets/8e63a425-cbf8-4872-b8f2-2be8c6a0cddc" />

