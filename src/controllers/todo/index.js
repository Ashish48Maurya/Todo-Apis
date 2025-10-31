import { Todo } from "../../models/index.js";
import { ApiResponse, ApiError } from "../../utilities/index.js";


export const getAllTodos = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json(ApiError.Unauthorized("User not authenticated."));
        }
        const todos = await Todo.findAll({
            where: { userId },
            order: [["created_at", "DESC"]],
        });
        return res
            .status(200)
            .json(new ApiResponse(200, todos, "Fetched user's todos successfully."));
    } catch (err) {
        console.error("Error fetching todos:", err);
        return res
            .status(500)
            .json(ApiError.InternalServerError("Failed to fetch todos."));
    }
};


export const getTodoById = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const todo = await Todo.findOne({ where: { id, userId } });
        if (!todo) {
            return res.status(404).json(ApiError.NotFound("Todo not found or unauthorized."));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, todo, "Fetched todo successfully."));
    } catch (err) {
        console.error("Error fetching todo:", err);
        return res
            .status(500)
            .json(ApiError.InternalServerError("Failed to fetch todo."));
    }
};

export const createTodo = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, description } = req.body;
        if (!userId) {
            return res.status(401).json(ApiError.Unauthorized("User not authenticated."));
        }
        if (!title) {
            return res.status(400).json(ApiError.BadRequest("Title is required."));
        }
        const newTodo = await Todo.create({
            title,
            description,
            userId,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, newTodo, "Todo created successfully."))
    } catch (err) {
        console.error("Error creating todo:", err);
        return res
            .status(500)
            .json(ApiError.InternalServerError("Failed to create todo."));
    }
};


export const updateTodo = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { title, description, isCompleted } = req.body;
        if (!title && !description && isCompleted === undefined) {
            return res.status(400).json(ApiError.BadRequest("At least one field (title, description, isCompleted) is required to update."));
        }
        const todo = await Todo.findOne({ where: { id, userId } });
        if (!todo) {
            return res.status(404).json(ApiError.NotFound("Todo not found or unauthorized."));
        }

        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (isCompleted !== undefined) todo.isCompleted = isCompleted;

        await todo.save();

        return res
            .status(200)
            .json(new ApiResponse(200, todo, "Todo updated successfully."));
    } catch (err) {
        console.error("Error updating todo:", err);
        return res
            .status(500)
            .json(ApiError.InternalServerError("Failed to update todo."));
    }
};


export const deleteTodo = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const todo = await Todo.findOne({ where: { id, userId } });
        if (!todo) {
            return res.status(404).json(ApiError.NotFound("Todo not found or unauthorized."));
        }

        await todo.destroy();
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Todo deleted successfully."));
    } catch (err) {
        console.error("Error deleting todo:", err);
        return res
            .status(500)
            .json(ApiError.InternalServerError("Failed to delete todo."));
    }
};