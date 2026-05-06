# MangaHub 📚

MangaHub is a manga & comic tracking system developed for the **Net-centric Programming (IT096IU)** course.  
The project demonstrates the use of multiple network communication protocols in a single application.

---

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 📖 Manga browsing and search
- 📚 Personal reading library
- 🔄 Reading progress tracking
- 💬 Real-time chat system
- 📡 Multi-protocol communication

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Bootstrap

### Backend (Planned / In Progress)
- Go (Golang)
- Gin (HTTP API)
- gRPC
- WebSocket
- TCP / UDP sockets
- SQLite

---

## 🌐 Network Protocols

This project implements the following protocols:

| Protocol   | Purpose |
|------------|--------|
| HTTP       | REST API (authentication, manga data) |
| WebSocket  | Real-time chat |
| TCP        | Progress synchronization |
| UDP        | Notification system |
| gRPC       | Internal service communication |

---

## 📁 Project Structure

MangaHub/
├── frontend/ # React frontend
│ ├── src/
│ │ ├── api/ # API calls
│ │ ├── components/ # UI components
│ │ ├── pages/ # Pages (login, manga list)
│ │ └── css/ # Styles
│ └── package.json
│
├── backend/ (coming soon) # Go backend services
│ ├── cmd/
│ ├── internal/
│ └── proto/
│
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/mangahub.git
cd mangahub
