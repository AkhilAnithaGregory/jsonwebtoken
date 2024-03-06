const express = require("express");
const connectDB = require("./mongodb"); // Import the connectDB function from db.js
const bodyParser = require("body-parser");
const Todo = require("./model/todo");

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();
app.use(bodyParser.json());
// Create a new todo
app.get("/", async (req, res) => {
  try {
    res.json("hello");
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({ title, description });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
