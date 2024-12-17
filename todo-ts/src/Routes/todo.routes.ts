import express from "express";
import { TodoController } from "../Controllers/todo.controller";

export const router = express.Router();

router.post("/create", TodoController.addTodo);
router.get("/", TodoController.getTodos);
router.get("/:id", TodoController.getTodoId);
router.delete("/:id", TodoController.deleteTodo);
router.put("/update/:id", TodoController.updateTodo);
