import { useEffect, useState } from "react";
import { Todo } from "../type/todo";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/todo/";

const TodoItem = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get<Todo[]>(API_URL).then((response) => setTodos(response.data));
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = async (id: string, done: boolean) => {
    try {
      // Send a PATCH or PUT request to update the "done" status
      await axios.patch(`${API_URL}${id}`, { done: !done });

      // Update the state to reflect the new "done" status
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, done: !done } : todo
        )
      );
    } catch (error) {
      console.error("Failed to update todo status:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Type something..."
          className="input input-bordered w-full max-w-md"
        />
        <button className="btn btn-primary max-w-md">Add</button>
      </div>

      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex flex-col items-center justify-center my-9"
        >
          <div className="card card-compact bg-base-100 w-7/12 shadow-xl">
            <div className="card-body">
              <input
                checked={todo.done}
                onChange={() => handleCheckboxChange(todo._id, todo.done)}
                type="checkbox"
                defaultChecked
                className="checkbox"
              />
              <h2 className="card-title">{todo.title}</h2>
              <p>{todo.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoItem;
