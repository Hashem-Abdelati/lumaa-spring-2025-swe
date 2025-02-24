# Task Manager

A simple and functional **Task Management Application** built using **React (TypeScript) for the frontend**, **Node.js (Express) for the backend**, and **PostgreSQL** as the database.

---

## Setup Guide

### **Backend Setup**
- Install **Node.js** (v16 or higher)
- Install **PostgreSQL**
- Install Dependencies:
  ```sh
  npm install
  ```

  #### Steps to set up the database:
1. Configure environment variables in a `.env` file:
   ```sh
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=taskmangerdatabase
   DB_PASSWORD=hashem001
   DB_PORT=5432
   JWT_SECRET=mysecretkey
   PORT=5001
   ```
2. Run database migrations:
   ```sh
   npx prisma migrate dev --name init

#### Steps to run backend:
1. Navigate to the server directory:
   ```sh
   cd server
   ```
2. Start the backend server:
   ```sh
   npm run dev
   ```
3. The server should now be running at `http://localhost:5001`. Below is the connection
   ```js
   app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
   });
   ```


---

### **Frontend Setup**
- Install **Node.js** (v16 or higher)
- Install **npm**
- Install Dependencies:
  ```sh
  npm install
  ```

#### Steps to run frontend:
1. Navigate to the frontend directory:
   ```sh
   cd ../client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

---

## Testing
I used **Postman** to test API routes.

Example SQL queries:
```sql
SELECT * FROM users;
SELECT * FROM tasks;
```

---

## Video Demo
A short demo video showing registration, login, and task operations can be found in the `video_demo.md` file.


## Salary Expectations
**$30 per hour ($4800 per month)**
