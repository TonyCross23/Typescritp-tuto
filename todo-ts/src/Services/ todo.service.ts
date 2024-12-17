import { todo } from "node:test";
import { Todo } from "../Models/todo";

export class todoService {
  //create todo
  async createTodo(data: any) {
    try {
      const newTodo = await Todo.create(data);
      return newTodo;
    } catch (error) {
      console.log(error);
    }
  }

  //get all todo
  async getAllTodo() {
    try {
      const todos = await Todo.find({});
      return todos;
    } catch (error) {
      console.log(error);
    }
  }

  //get todo with id
  async getTodoById(id: string) {
    try {
      const todo = await Todo.findById({ _id: id });
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  //update todo
  async updateTodo(id: string, data: any) {
    try {
      const todoz = await Todo.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!todoz) {
        return "todo not found";
      }
      return todoz;
    } catch (error) {
      console.log(error);
    }
  }

  //delete todo
  async deleteTodo(id: string) {
    try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        return "todo not found";
      }
      return todo;
    } catch (error) {
      console.log(error);
    }
  }
}

export const todoServices = new todoService();
