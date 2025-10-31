# 📝 Todo API

A complete **RESTful API** built using **Node.js, Express, Sequelize (PostgreSQL)** for managing users and their todo tasks.  
This project includes **JWT-based authentication**, **cron jobs** for automated task notifications, and is **deployed on AWS**.

---

## 🚀 Features

- 👤 **User Authentication**
  - Register and login with secure password hashing (bcrypt)
  - JWT token-based authentication middleware
  
- ✅ **Todo Management**
  - Create, Read, Update, and Delete todos
  - Todos are linked to authenticated users
  - Each todo includes title, description, completion status, and timestamps
  
- ⏰ **Cron Job**
  - Runs every **5 minutes**
  - Detects newly created todos and sends notification emails using **Nodemailer**
  
- 🌐 **Deployment**
  - Hosted on **AWS EC2**
  - Uses **PostgreSQL** as database
  - Environment variables managed via `.env` file

---

## 🧩 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **Sequelize ORM** | Database ORM for PostgreSQL |
| **PostgreSQL** | Relational database |
| **JWT (jsonwebtoken)** | Authentication |
| **bcryptjs** | Password hashing |
| **node-cron** | Cron job scheduling |
| **Nodemailer** | Email notifications |
| **dotenv** | Environment variable management |

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Ashish48Maurya/Todo-Apis.git
cd Todo-Apis
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_database_connection_string_here
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email_here
EMAIL_PASS=your_email_password_here
```

### 4️⃣ Start the Server
```bash
npm start
```

The server will run on `http://localhost:5000`

---

## 🌐 Deployed API Endpoints

**Base URL:** `http://13.203.74.111:5000`

### 🔐 Authentication Endpoints

#### Register User
- **URL:** `http://13.203.74.111:5000/api/user/register`
- **Method:** `POST`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
- **URL:** `http://13.203.74.111:5000/api/user/login`
- **Method:** `POST`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response:** Returns JWT token stored in HTTP-only cookie

---

### ✅ Todo Endpoints
> **Note:** All todo endpoints require JWT authentication. The token is automatically sent via cookies after login.

#### Create Todo
- **URL:** `http://13.203.74.111:5000/api/todo/task`
- **Method:** `POST`
- **Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README file",
  "completed": false
}
```

#### Get All Todos
- **URL:** `http://13.203.74.111:5000/api/todo/tasks`
- **Method:** `GET`
- **Description:** Retrieves all todos for the authenticated user

#### Get Single Todo
- **URL:** `http://13.203.74.111:5000/api/todo/task/:id`
- **Method:** `GET`
- **Example:** `http://13.203.74.111:5000/api/todo/task/123`
- **Description:** Retrieves a specific todo by ID

#### Update Todo
- **URL:** `http://13.203.74.111:5000/api/todo/task/:id`
- **Method:** `PUT`
- **Example:** `http://13.203.74.111:5000/api/todo/task/123`
- **Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

#### Delete Todo
- **URL:** `http://13.203.74.111:5000/api/todo/task/:id`
- **Method:** `DELETE`
- **Example:** `http://13.203.74.111:5000/api/todo/task/123`
- **Description:** Deletes a specific todo by ID

---

## 🔒 Authentication Flow

1. User registers or logs in
2. Server generates JWT token upon successful authentication
3. Token is stored in an HTTP-only cookie (secure)
4. Cookie is automatically sent with each subsequent request
5. Server validates token from cookie using middleware before processing requests

---

## 📧 Email Notifications

The cron job monitors newly created todos and sends email notifications every 5 minutes using Nodemailer. Users receive updates about their tasks automatically via email.

---

## 👨‍💻 Author

**Ashish Maurya**
- GitHub: [@Ashish48Maurya](https://github.com/Ashish48Maurya)

---

## 🙏 Acknowledgments

- Express.js community
- Sequelize ORM documentation
- AWS for hosting
- Nodemailer for email services

---
