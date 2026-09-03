# 📝 NoTicker

A full-stack note-taking application built with the **MERN stack**. NoTicker allows users to create, edit, delete, and organize notes through a clean and responsive interface.

🔗 **Live Demo:** [Add your Render URL here]
📦 **Repository:** [Add your GitHub repository URL here]

## ✨ Features

* 📝 Create, edit, and delete notes
* 📌 Pin and unpin notes
* 🔝 Pinned notes are displayed at the top
* 🗂️ Separate sections for pinned and other notes
* 📅 Displays creation and modification dates
* 🔄 Modification date updates only when the note's content or title changes
* 😀 Emoji picker for adding emojis to notes
* ⌨️ Keyboard shortcuts for faster note creation and editing
* 📱 Responsive design for desktop and mobile devices
* ⚡ Loading and error states
* 🛡️ API rate limiting
* 🔔 Toast notifications for user actions
* 🎨 Custom UI with Tailwind CSS and DaisyUI

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* DaisyUI
* Axios
* Lucide React
* React Hot Toast
* Emoji Picker React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API
* Upstash Rate Limiting

### Tools & Deployment

* Git & GitHub
* Postman
* VS Code
* Render

## 📂 Project Structure

```text
NoTicker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── lib/
    │   └── App.jsx
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB database

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd NoTicker
```

### 2. Install dependencies

Install the backend dependencies:

```bash
cd backend
npm install
```

Install the frontend dependencies:

```bash
cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory and add the required environment variables:

```env
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
PORT=5001
```

### 4. Start the backend

```bash
cd backend
npm run dev
```

### 5. Start the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

The application will then be available at the local development URL shown by Vite.

## 🎯 What I Built / Learned

This project was built to gain practical experience developing a full-stack application with the MERN stack.

Through NoTicker, I worked with:

* Building RESTful APIs with Express.js
* Connecting a Node.js backend to MongoDB using Mongoose
* Implementing CRUD operations
* Managing application state with React
* Connecting a React frontend to backend APIs using Axios
* Implementing client-side routing with React Router
* Handling loading, error, and rate-limit states
* Designing responsive interfaces with Tailwind CSS
* Deploying a full-stack application
* Working with Git and GitHub

## 📸 Screenshots

*Add screenshots of the application here.*

## 🔮 Future Improvements

Possible future improvements include:

* User authentication and individual user accounts
* Search and filtering
* Note categories/tags
* Dark mode
* Rich-text editing
* Improved note organization

## 📄 License

This project is for educational and portfolio purposes.
