import { Router } from 'express';
const router = Router();
import Todo from '../models/todo.js';

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post('/', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).json(todo);
});

router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

router.patch('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send('Not found');

  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});


export default router;
