const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

// GET /tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title must not be empty." });
  }
  if (title.trim().length > 255) {
    return res.status(400).json({ error: "Title must be 255 characters or fewer." });
  }
  const task = { id: nextId++, title: title.trim(), status: "todo" };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number." });
  }
  const { status } = req.body;
  if (!["todo", "done"].includes(status)) {
    return res.status(400).json({ error: 'Status must be "todo" or "done".' });
  }
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found." });
  task.status = status;
  res.json(task);
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number." });
  }
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Task not found." });
  tasks.splice(index, 1);
  res.status(204).send();
});

// Malformed JSON body
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON in request body." });
  }
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "An unexpected error occurred." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));