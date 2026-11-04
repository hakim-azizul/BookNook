# BookNook — Modern Full-Stack Library Management System

Welcome to **BookNook**, a full-stack digital library management application designed to provide readers and administrators with a seamless experience for browsing, borrowing, and managing books. Built with high performance, intuitive UX, and secure access control in mind.

<img width="1052" height="1538" alt="image" src="https://github.com/user-attachments/assets/158d139d-88fe-4f6c-be50-c3c3a5d220aa" />

<img width="1065" height="1551" alt="image" src="https://github.com/user-attachments/assets/9b5b43d4-2197-4e86-9743-d6554165278f" />


🌐 **Live Client Site**: [https://book-nook-mocha.vercel.app](https://book-nook-mocha.vercel.app)  
⚙️ **Live Server API**: `https://book-nook-server-eta.vercel.app`

---

## ✨ Key Features

* 🔐 **Secure Google OAuth Authentication** — Seamless user sign-in and session security powered by `better-auth`, JWT verification, and JWKS token management.
* 📖 **Comprehensive Catalog & Real-Time Filtering** — Browse curated collections across categories like Literature, Philosophy, History, and Non-Fiction with real-time dynamic search and filtering.
* 🔄 **Complete Borrow & Return Workflow** — Authenticated users can request book borrowings, track due limits, and manage their active borrowed lists smoothly.
* 🎨 **Theme-Aware Responsive UI (Dark/Light)** — Modern user interface designed using **HeroUI** and **Tailwind CSS**, supporting full Dark Mode toggle with adaptive image sourcing.
* 🛠️ **Full CRUD & Protected Admin Operations** — Secure routes allowing authorized users to create, update, and manage book inventories safely backed by server-side verification middleware.
* ⚡ **Production-Ready & High Performance** — Configured with strict CORS management, optimized Vercel edge deployment, preflight request handling, and toast notifications.

---

## 🛠️ Tech Stack & Architecture

### **Frontend (Client)**
* **Framework**: Next.js (App Router)
* **UI Components**: HeroUI / NextUI
* **Styling**: Tailwind CSS (Dark/Light mode support)
* **Icons & Notifications**: Lucide React / React Hot Toast
* **Hosting**: Vercel

### **Backend (Server)**
* **Runtime & Framework**: Node.js & Express.js
* **Database**: MongoDB Atlas
* **Authentication**: `better-auth`, `jose` (`jwtVerify`, `createRemoteJWKSet`)
* **Security & Middleware**: `cors`, Custom JWT Authorization Middleware
* **Hosting**: Vercel Serverless

---

## 📁 Repository & Project Structure

```text
book-nook/
├── client/                 # Next.js Frontend
│   ├── app/                # Next.js App Router Page Routes
│   ├── components/         # HeroUI Components & Theme Wrappers
│   └── public/             # Static Assets & Fallback Covers
│
└── server/                 # Express Node.js Backend
    ├── index.js            # Entry Point, API Routes & CORS Config
    ├── vercel.json         # Serverless Deployment Config
    └── .env                # Server Environment Variables
```

---

## 🔑 Environment Variables

To run this project locally, ensure you create appropriate `.env` files in both the client and server directories.

### Server `.env`
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

### Client `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/hakim-azizul/BookNook-Server.git
cd BookNook-Server
git clone https://github.com/hakim-azizul/BookNook.git
cd BookNook
```

### 2. Setup Server
```bash
npm install
npm run start
```

### 3. Setup Client
```bash
cd ../client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🛡️ License

This project is made for personal and educational use.
