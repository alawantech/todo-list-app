import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo
} from '../controllers/todoController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
