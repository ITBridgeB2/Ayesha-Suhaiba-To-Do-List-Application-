import cors from 'cors';
import express from 'express';
import mysql from 'mysql2/promise';

const taskapp = express();

taskapp.use(express.json());
taskapp.use(express.urlencoded({ extended: true }));
taskapp.use(cors());

let db;

// Create DB connection
(async () => {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'itbridge',
    });
    console.log('Connected to MySQL database.');
  } catch (err) {
    console.error('MySQL connection error:', err.message);
  }
})();

// Get all tasks
taskapp.get('/tasks', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM tasks');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one task by ID
taskapp.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (results.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new task
taskapp.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const [result] = await db.query(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.status(201).json({ id: result.insertId, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task
taskapp.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const [result] = await db.query(
      'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
      [title, description, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });

    res.json({ id, title, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
taskapp.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

taskapp.listen('9098')
  console.log(`Server is running on port 9098`);

