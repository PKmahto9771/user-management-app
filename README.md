# 📌 User Management API

### Features:
- 🔐 Secure user authentication with JWT & HTTP-only cookies
- 👤 Full User Management (CRUD) API
- 🔑 Password hashing using bcrypt for security
- 🚀 Built with Node.js, Express, MongoDB, and Mongoose ORM

### 🚀 Project Setup Instructions
🔹 1️⃣ Clone the Repository
```shell
git clone https://github.com/your-username/user-management-app.git
cd user-management-app
```
🔹 2️⃣ Install Dependencies
```shell
npm install
```
🔹 3️⃣ Set Up Environment Variables
```shell
PORT=...
MONGO_URI=y...
JWT_SECRET=...
```
🔹 4️⃣ Start the Server
```shell
npm start
```

## 📌 API Endpoints Documentation  

### 🔹 Authentication Routes (`/api/auth`)  

| Method | Endpoint   | Description                 | Auth Required? |
|--------|-----------|-----------------------------|---------------|
| `POST` | `/register` | Register a new user         | ❌ No |
| `POST` | `/login`    | Login & get JWT token       | ❌ No |

### 🔹 User Management Routes (`/api/users`)  

| Method  | Endpoint  | Description          | Auth Required? |
|---------|----------|----------------------|---------------|
| `POST`  | `/`      | Create a new user     | ✅ Yes |
| `GET`   | `/`      | Get all users         | ✅ Yes |
| `GET`   | `/:id`   | Get a user by ID      | ✅ Yes |
| `PUT`   | `/:id`   | Update a user by ID   | ✅ Yes |
| `DELETE`| `/:id`   | Delete a user by ID   | ✅ Yes |

## 📌 Database Schema Details  

### 🔹 Users Collection (`users`)  
This collection stores user details and is used for user management.  

| Field  | Type   | Description               | Constraints |
|--------|--------|---------------------------|-------------|
| `_id`  | ObjectId | Unique identifier (auto-generated) | Primary Key |
| `name`  | String  | Full name of the user   | Required |
| `email` | String  | User’s email address (must be unique) | Required, Unique |
| `age`   | Number  | User's age (optional)   | Optional |

---

### 🔹 Authentication Collection (`authusers`)  
This collection stores credentials for authentication purposes.  

| Field  | Type   | Description               | Constraints |
|--------|--------|---------------------------|-------------|
| `_id`  | ObjectId | Unique identifier (auto-generated) | Primary Key |
| `email` | String  | User’s email address (linked to Users) | Required, Unique |
| `password` | String  | Hashed user password   | Required |

---

### 🔹 Security & Constraints  
- **Passwords are hashed** using bcrypt for security.  
- **Emails must be unique** across both `users` and `authusers`.  
- **Age field is optional** and must be a positive number if provided.  

