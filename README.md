<h1 align="center">🏦 LU Banking Management System – Capstone Project</h1>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Framework-Next.js-blue.svg"></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/Database-MongoDB-green.svg"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/UI-TailwindCSS-38bdf8.svg"></a>
  <a href="https://img.shields.io/badge/License-MIT-blue.svg"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <a href="https://github.com/Abhi12002/LU-Banking-Management-System/stargazers"><img src="https://img.shields.io/github/stars/Abhi12002/LU-Banking-Management-System?style=social"></a>
</p>

---

## 📝 Overview

A production-grade **banking management system** developed as a final-year **capstone project** at Lakehead University. This full-stack web application replicates real-world banking workflows—user authentication, account creation, transactions, and admin control—in a secure and scalable environment.

The platform is built with **Next.js**, **Tailwind CSS**, **MongoDB**, and **Node.js**, focusing on **performance**, **user experience**, and **extensibility**. It’s designed to simulate practical fintech systems while laying the groundwork for future **data science**, **DevOps**, and **MLOps** applications.

---

## 📸 UI Snapshot

<p align="center">
  <img src="./BankingSystem.png" alt="Login Screen" width="700" />
</p>

---

## 🚀 Live Demo

🌐 [https://comp-4431-group-project.vercel.app](https://comp-4431-group-project.vercel.app)

---

## 📊 Data Science Relevance

This project is engineered for **data-driven scalability**, enabling future analytics and machine learning use cases:

* 🧩 **Structured Data Model:** Transactional records, user metadata, account types
* 🔄 **API-Driven Data Flows:** REST APIs allow streamlined data aggregation and downstream pipelines
* 📊 **ML Integration Ready:** Supports fraud detection, credit risk modeling, and anomaly detection
* 📈 **Real-Time Dashboards (Planned):** Ideal for future data visualization with tools like D3, Plotly, or Streamlit
* 🛠️ **Deployable Infrastructure:** Aligns with cloud-native, containerized, CI/CD-ready workflows

---

## ✨ Features

* 🔐 **Secure Authentication** with NextAuth & reCAPTCHA
* 💳 **User Banking Actions**: Open accounts, deposit, withdraw, view history
* 🧮 **Balance Tracking** with real-time updates
* 📋 **Admin Dashboard**: View/manage all users and transactions
* 💬 **Notifications System** *(Planned)*
* 📱 **Fully Responsive Design** optimized for mobile/tablet/desktop
* 🛡️ **Role-based Access Control (RBAC)** built-in

---

## ⚙️ Tech Stack

### 💻 Frontend

* [Next.js](https://nextjs.org/) – React-based frontend framework
* [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
* [TypeScript](https://www.typescriptlang.org/) – Type-safe frontend development

### 🧠 Backend

* [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) – Integrated backend
* [MongoDB](https://www.mongodb.com/) – NoSQL cloud database
* [Mongoose](https://mongoosejs.com/) – ODM for MongoDB

### 🔐 Auth & Security

* [NextAuth.js](https://next-auth.js.org/) – Authentication & session management
* [Google reCAPTCHA](https://www.google.com/recaptcha/about/) – Bot protection

---

## 🏁 Getting Started

### 🔧 Prerequisites

* Node.js v16+
* MongoDB Atlas account (or local MongoDB)

### 📦 Installation

```bash
git clone https://github.com/Abhi12002/LU-Banking-Management-System.git
cd LU-Banking-Management-System
npm install
```

### 🔐 Environment Setup

Create `.env.local` with:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

(Optional GitHub login)

```env
GITHUB_ID=your_client_id
GITHUB_SECRET=your_client_secret
```

### ▶️ Run Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
LU-Banking-Management-System/
├── app/               # App entry point
├── components/        # Shared UI components
├── constants/         # Static values/config
├── lib/               # API helpers, utilities
├── models/            # Mongoose models (User, Account, Transaction)
├── pages/api/         # Backend API routes
├── public/            # Static assets
├── styles/            # Global CSS
├── types/             # TypeScript types
└── .env.local         # Environment configuration
```

---

## 🧪 Usage

### 👤 User Flow

* Sign up/login securely
* Create multiple bank accounts
* Perform deposits & withdrawals
* View transaction history in dashboard

### 🛡️ Admin Flow

* View all registered users
* Monitor all transactions
* (Planned) Export transaction logs & analytics

---

## 🔮 Future Improvements

* 📊 Admin Analytics Dashboard (charts, KPIs)
* 📧 Notifications for large transactions
* 📤 Export reports to CSV/PDF
* 🔑 Two-Factor Authentication (2FA)
* 🌙 Dark Mode UI toggle
* ♿ Full Accessibility (ARIA, WCAG compliance)
* 🧠 ML Models: Fraud detection, spending categorization, credit scoring
* 🐳 Dockerized deployment with CI/CD workflows

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

**Abhinav Mishra**
📧 [mishraabinav30@gmail.com](mailto:mishraabinav30@gmail.com)
💻 [GitHub – @Abhi12002](https://github.com/Abhi12002)
🔗 [LinkedIn – Abhinav Mishra](https://www.linkedin.com/in/abhinav-mishra-4b72b120b/)

> Built with ❤️ to simulate real-world banking infrastructure, enable hands-on full stack experience, and support data-driven fintech exploration.
