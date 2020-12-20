const express = require('express');
const app = express();
const pool = require('./db');

// middleware
app.use(express.json());

// Routes

// create TODO

app.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todolist (title,description) VALUES ($1,$2) RETURNING *',
      [title, description]
    );
    console.log('inserted');
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// Get all TODO
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todolist');
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

// Get a TODO
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const allTodos = await pool.query('SELECT * FROM todolist WHERE id=($1)', [
      id,
    ]);
    // console.log(req.params);
    res.json(allTodos.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update TODO
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const editTodos = await pool.query(
      'UPDATE todolist SET description = $1 where id=$2 RETURNING *',
      [description, id]
    );
    res.json(editTodos.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Delete TODO
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todolist WHERE id = $1', [
      id,
    ]);
    res.json('deleted successfully');
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(8080, () => {
  console.log('server started at PORT 8080');
});
