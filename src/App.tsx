import { useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  task: string;
  complete: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() === "") return;
    const newTodo: Todo = { id: Date.now(), task, complete: false };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const markTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="row gx-0 text-center mb-5">
        <h1>Task 13 : TypeScript Hands-On Todo - List</h1>
        <hr className="hr" />
      </div>
      <div className="row gx-0 justify-content-center">
        <div className="col-6 bg-dark-subtle rounded-4 px-4 py-3">
          <h4>Add Task</h4>
          <form className="row gx-0 mb-3" id="todo-form" onSubmit={addTodo}>
            <div className="col-12 col-md-10 my-1">
              <input
                id="todo-input"
                type="text"
                className="form-control"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-2 my-1 d-flex justify-content-end">
              <button id="todo-btn" className="btn btn-primary" type="submit">
                Add Task
              </button>
            </div>
          </form>

          <div className="row gx-0 mb-3">
            <h4 className="mb-3">Your Todo-List</h4>
            <ul id="todo-list">
              {todos.length === 0 ? (
                <p>&lt;-- Add Some Todos to Your List --&gt;</p>
              ) : (
                todos.map((todo, index) => (
                  <li
                    key={todo.id}
                    className={`row gx-0 justify-content-between py-3 my-3 p-3 rounded-2 ${
                      index % 2 === 0 ? "bg-body-secondary" : "bg-body-tertiary"
                    }`}
                  >
                    <p
                      className="fs-4 col-12 col-sm-5 mb-1 d-flex align-items-center"
                      style={{
                        textDecoration: todo.complete ? "line-through" : "none",
                      }}
                    >
                      {todo.task}
                    </p>
                    <div className="btns col-12 col-sm-7 d-flex justify-content-end">
                      <button
                        className={`btn m-1 ${
                          todo.complete
                            ? "btn-outline-info"
                            : "btn-outline-success"
                        }`}
                        onClick={() => markTodo(todo.id)}
                      >
                        {todo.complete
                          ? "Mark As Incomplete"
                          : "Mark As Complete"}
                      </button>
                      <button
                        className="btn m-1 btn-outline-danger"
                        onClick={() => removeTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
