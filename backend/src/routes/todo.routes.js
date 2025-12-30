import express from 'express';
import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    deleteMultipleTodos,
} from '../controllers/todo.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateCreateTodo, validateUpdateTodo } from '../middlewares/todo.validation.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/todos - Get all todos for user
router.get('/', getTodos);

// POST /api/todos - Create new todo
router.post('/', validateCreateTodo, createTodo);

// GET /api/todos/:todoId - Get single todo
router.get('/:todoId', getTodoById);

// PUT /api/todos/:todoId - Update todo
router.put('/:todoId', validateUpdateTodo, updateTodo);

// DELETE /api/todos/:todoId - Delete single todo
router.delete('/:todoId', deleteTodo);

// POST /api/todos/bulk-delete - Delete multiple todos
router.post('/bulk-delete', deleteMultipleTodos);

export default router;
