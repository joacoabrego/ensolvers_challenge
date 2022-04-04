import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Outlet } from "react-router-dom";
import "./styles.css";
import * as axios from "axios";

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const [todoInputValue, setInputValue] = useState("");
  let navigate = useNavigate();
  const fetchTodos = async () => {
    try {
      const todoList = await axios.get("http://localhost:5001/api/todos");
      setTodos(todoList.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCompletion = async (todoId, isCompleted) => {
    try {
      await axios.put(
        `http://localhost:5001/api/todos/${todoId}/mark/${
          isCompleted ? "incomplete" : "complete"
        }`
      );
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const addNewTodo = async (todoContent) => {
    try {
      await axios.post("http://localhost:5001/api/todos", {
        name: todoContent,
      });
      setInputValue("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:5001/api/todos/${todoId}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const renderTodos = () => {
    if (todos.length === 0) {
      return (
        <div>
          <label>Add a todo!</label>
        </div>
      );
    }

    return (
      <div
        style={{
          flexDirection: "column",
          overflowY: "scroll",
          height: "50vh",
        }}
      >
        {todos.map((todo) => {
          return (
            <div
              className="row"
              style={{ marginBottom: 10, marginRight: 20, marginLeft: 20 }}
              key={todo.id}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  flex: 0.5,
                }}
              >
                <input
                  className="ui checkbox"
                  type="checkbox"
                  name="completed"
                  checked={todo.completed ? "checked" : ""}
                  onChange={() => handleCompletion(todo.id, todo.completed)}
                />
                <label></label>
              </div>

              <div style={{ flex: 5 }}>
                <p>{todo.name}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  marginRight: "1vw",
                }}
              >
                <button
                  className="ui primary basic button"
                  onClick={() => {
                    navigate(`/${todo.id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="ui secondary basic button"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    fetchTodos();
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {renderTodos()}
      <div
        className="ui action input"
        style={{ width: "50vw", paddingTop: "20px" }}
      >
        <input
          type="text"
          placeholder="Todo title..."
          value={todoInputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="ui button"
          onClick={() => addNewTodo(todoInputValue)}
        >
          Add
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default TodoList;
