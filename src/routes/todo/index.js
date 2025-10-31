import express from "express";
import { getAllTodos, getTodoById, deleteTodo, updateTodo, createTodo } from "../../controllers/todo/index.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";
const router = express.Router();

router.post("/task", authMiddleware, createTodo);
router.get("/tasks", authMiddleware, getAllTodos);
router.get("/task/:id", authMiddleware, getTodoById);
router.put("/task/:id", authMiddleware, updateTodo);
router.delete("/task/:id", authMiddleware, deleteTodo);

export default router;