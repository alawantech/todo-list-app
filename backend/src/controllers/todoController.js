import prisma from '../utils/prisma.js';

export const getTodos = async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: { userId: req.userId },
    orderBy: [{ isCompleted: 'asc' }, { dueDate: 'asc' }]
  });

  return res.json({ todos });
};

export const getTodoById = async (req, res) => {
  const todo = await prisma.todo.findFirst({
    where: { id: req.params.id, userId: req.userId }
  });

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found.' });
  }

  return res.json({ todo });
};

export const createTodo = async (req, res) => {
  const { title, description, dueDate, isCompleted } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: 'Title, description, and due date are required.' });
  }

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      isCompleted: Boolean(isCompleted),
      userId: req.userId
    }
  });

  return res.status(201).json({ todo });
};

export const updateTodo = async (req, res) => {
  const { title, description, dueDate, isCompleted } = req.body;

  const existingTodo = await prisma.todo.findFirst({
    where: { id: req.params.id, userId: req.userId }
  });

  if (!existingTodo) {
    return res.status(404).json({ message: 'Todo not found.' });
  }

  const todo = await prisma.todo.update({
    where: { id: req.params.id },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(dueDate !== undefined ? { dueDate: new Date(dueDate) } : {}),
      ...(isCompleted !== undefined ? { isCompleted: Boolean(isCompleted) } : {})
    }
  });

  return res.json({ todo });
};

export const deleteTodo = async (req, res) => {
  const existingTodo = await prisma.todo.findFirst({
    where: { id: req.params.id, userId: req.userId }
  });

  if (!existingTodo) {
    return res.status(404).json({ message: 'Todo not found.' });
  }

  await prisma.todo.delete({ where: { id: req.params.id } });
  return res.status(204).send();
};
