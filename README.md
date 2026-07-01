# 💬 WeChat - Real-Time Chat Application

> A modern real-time chat application inspired by WhatsApp, built with the **MERN Stack**, featuring secure authentication, email verification, and instant messaging powered by WebSockets.

<p align="center">
  <img src="./frontend/src/assets/WeChat.svg" width="120" alt="WeChat Logo"/>
</p>

---

## ✨ Features

- 🔐 Secure JWT Authentication
- 📧 Email Verification & Password Reset
- 💬 Real-time One-to-One Messaging
- ⚡ Instant Message Delivery using Socket.IO
- 👤 User Authentication & Authorization
- 🖼️ Profile Image Upload (Cloudinary)
- 🔍 Search Users
- 📱 Responsive UI
- 🚫 Protected Routes
- 🌙 Modern Clean Interface
- ⚠️ Centralized Error Handling
- ✅ Request Validation
- 🧩 Modular MVC Backend Architecture

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS
- Radix UI Components
- React Hook Form
- Sonner (Toast Notifications)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- Nodemailer
- Cloudinary

---

# 📂 Project Structure

```
.
├── backend
│   ├── config
│   ├── controllers
│   ├── emails
│   ├── lib
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── validators
│   └── server.js
│
└── frontend
    ├── src
    │   ├── assets
    │   ├── components
    │   ├── hooks
    │   ├── layouts
    │   ├── lib
    │   ├── pages
    │   └── routes
    └── vite.config.js
```

---

# 🔒 Authentication Flow

- User Registration
- Email Verification
- Secure Login
- JWT Token Authentication
- Protected API Routes
- Forgot Password
- Reset Password via Email

---

# ⚡ Real-Time Features

- Instant messaging
- Live online users
- Socket.IO communication
- Real-time chat updates
- Persistent chat history

---

# 📧 Email Services

The application includes email functionality for:

- Account Verification
- Password Reset
- Verification Templates
- Custom Email Templates using Nodemailer

---

# ☁️ Media Upload

User profile images are uploaded securely using **Cloudinary**.

---

# 🧠 Backend Architecture

The backend follows a layered architecture:

```
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models (MongoDB)
```

Additional layers include:

- Middleware
- Validators
- Utilities
- Email Services
- Socket Layer

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/as7sh/wechat.git

cd wechat
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file.

```env
PORT=

MONGO_URI=

JWT_SECRET=

CLIENT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASSWORD=
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file

```env
VITE_API_URL=
```

Run frontend

```bash
npm run dev
```

---

# 📡 API Modules

- Authentication
- Users
- Chats
- Messages

---

# 🗂 Backend Modules

```
Authentication
│
├── Login
├── Register
├── Email Verification
├── Forgot Password
└── JWT Authentication

Chat
│
├── Create Chat
├── Fetch Chats
└── Chat Management

Message
│
├── Send Message
├── Receive Messages
└── Socket Events

User
│
├── Profile
├── Search Users
└── Avatar Upload
```

---

# 🔐 Security

- JWT Authentication
- Password Hashing
- Protected Routes
- Request Validation
- Secure Email Verification
- Error Handling Middleware

---

# 📈 Future Improvements

- Voice Messages
- Video Calling
- Typing Indicators
- Read Receipts
- Push Notifications
- Message Reactions
- File Sharing
- End-to-End Encryption
- Message Editing & Deletion

---

# 👨‍💻 Author

**Asish**

GitHub: https://github.com/as7sh

---

<p align="center">
Made with ❤️ using the MERN Stack and Socket.IO
</p>
