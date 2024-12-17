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
}

export const TodoController = new todoController();
