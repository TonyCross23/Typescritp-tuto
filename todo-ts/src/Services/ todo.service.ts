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
}

export const todoServices = new todoService();
