const express = require("express")
const cors = require("cors")
const pool = require("./database")
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 5001;


//localhost:3000 - frontend
//localhost:4000 - backend 
//cors blocks this connection (unsafe)

// Middleware to check JWT authentication
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access Denied" });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid Token" });
      req.user = user;
      next();
    });
  };

// User registration
app.post("/auth/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }
    try {
      // Ensure you have required imports, e.g., bcrypt and your database pool
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
        [username, hashedPassword]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error in /auth/register:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // User login
app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const result = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
  
      if (result.rows.length === 0) {
        return res.status(400).json({ error: "User not found" });
      }
  
      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ error: "Invalid password" });
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // CRUD operations for tasks (only for authenticated users)
  
  // Get all tasks for the logged-in user
  app.get("/tasks", authenticateToken, async (req, res) => {
    try {
        console.log("Fetching tasks for user:", req.user.userId); // Debugging log

        const result = await pool.query(
            "SELECT * FROM tasks WHERE userid = $1", // Fix here
            [req.user.userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: error.message });
    }
});
  
  // Create a new task
  app.post("/tasks", authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    console.log("Authenticated User:", req.user); // Debugging log

    if (!req.user.userId) {
        return res.status(400).json({ error: "User ID missing from token" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description, isComplete, userid) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, false, req.user.userId] // Fix here
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error inserting task:", error);
        res.status(500).json({ error: error.message });
    }
});

  // Update a task
  app.put("/tasks/:id", authenticateToken, async (req, res) => {
    const { title, description, isComplete } = req.body;

    try {
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 AND userid = $5 RETURNING *",
            [title, description, isComplete, req.params.id, req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Task not found or unauthorized" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: error.message });
    }
});

  
  // Delete a task
  app.delete("/tasks/:id", authenticateToken, async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND userid = $2 RETURNING *", [
            req.params.id,
            req.user.userId,
        ]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Task not found or unauthorized" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: error.message });
    }
});


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

//app.listen(4000, ()=> console.log("Server on localhost:4000"))