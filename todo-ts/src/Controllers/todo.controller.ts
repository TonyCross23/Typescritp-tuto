import { Request, Response } from "express";
import { TodoSchemaValidation } from "../Models/todo";
import { todoServices } from "../Services/ todo.service";

class todoController {
  //add todo controller
  addTodo = async (req: Request, res: Response) => {
    //data save to db
    const data = {
      title: req.body.title,
      description: req.body.description,
      done: req.body.done,
    };

    //validating request
    const { error, value } = TodoSchemaValidation.validate(data);

    if (error) {
      console.log(error.message);
    } else {
      const todo = await todoServices.createTodo(value);
      res.status(201).json({
        message: "Todo created succefully",
        data: todo,
      });
    }
  };

  //get all todos
  getTodos = async (req: Request, res: Response) => {
    const todos = await todoServices.getAllTodo();
    res.json(todos).status(200);
  };

  //get todo with id
  getTodoId = async (req: Request, res: Response) => {
    //get id from parameter
    const id = req.params.id;
    const todo = await todoServices.getTodoById(id);
    res.json(todo);
  };

  //update todo
  updateTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const todo = await todoServices.updateTodo(id, req.body);
    res.status(201).json({
      message: "Todo updated successfull",
      data: todo,
    });
  };

  //delete todo
  deleteTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    await todoServices.deleteTodo(id);
    res.json("Todo deleted succefully");
  };
}

export const TodoController = new todoController();
