# 🧑‍💼 Job Portal App

A modern full-stack Job Portal platform where recruiters can post jobs and manage listings, and candidates can register, view jobs, and apply. Built with cutting-edge technologies and a clean component structure using ShadCN UI and the new `motion` animation library.

---

## 🚀 Features

### 👥 Authentication
- Role-based authentication (Recruiter & Candidate)
- Protected routes for recruiter and candidate dashboards
- Token stored in cookies, with Zustand for user state

### 📄 Recruiter Panel
- Post job with Zod + React Hook Form validation
- Manage jobs: Edit & Delete jobs
- View list of jobs with tags (badges) for job types
- Animated transitions using `motion`

### 👤 Candidate Panel
- Candidate registration & dashboard
- View available jobs (coming soon)
- Apply for jobs (coming soon)

### 💄 UI/UX
- ShadCN UI components
- Layout with sidebar + topbar
- Animated route transitions using `motion/react`
- Dark mode toggle

---

## 🛠 Tech Stack

### Frontend
- **React + TypeScript**
- **React Router DOM**
- **Zustand** – global state management
- **Zod** – schema validation
- **ShadCN UI** – clean UI components
- **motion.dev** – modern animation library
- **Axios** – for API calls

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Auth** (stored in cookies)

---

## Install Dependencies

For client
cd client
npm install

For server
cd ../server
npm install

## Environment Variables
Create a .env file in /server:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

---

## Run The App
In server folder
npm run dev

In client folder
npm run dev
