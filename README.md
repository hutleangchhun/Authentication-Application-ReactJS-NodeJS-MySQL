# Project Title

A full-stack authentication application built with React (Vite) for the frontend and Node.js (Express) for the backend with MySQLl for Database.

## 🚀 Features

- Frontend: React.js + Vite + Tailwind CSS
- Backend: Node.js + Express + (MySQL)
- RESTful API (MVC)
- CRUD operations (User)
- SweetAlert 2
- For Admin role user can create, update, delete user
- For User role user can only view data show from api
- Encrypt Password using bcrypt
- React Icons
  
## ⚙️ How to use project 

- http://localhost:5173/ : Login Page (Username, Password)
- http://localhost:5173/register : Register Page ( Username, Password, Role)
- After Login go to Dashboard

## MYSQL

CREATE DATABASE auth_db;
USE auth_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user'
);
