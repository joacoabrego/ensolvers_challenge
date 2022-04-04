import React, { useEffect, useState } from "react";
import * as axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";

const Todo = (props) => {
  const params = useParams();
  const [todo, setTodo] = useState({});
  const [newTodoName, setNewTodoName] = useState("");
  const [todoId, setTodoId] = useState(params.todoId);
  let navigate = useNavigate();

  const getTodoById = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/todos/${todoId}`);
      setTodo(res.data);
      setNewTodoName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };
  const updateTodo = async () => {
    try {
      const res = await axios.put(`http://localhost:5001/api/todos/${todoId}`, {
        name: newTodoName,
      });
      goBack();
    } catch (error) {
      console.log(error);
    }
  };
  const goBack = () => {
    navigate("/");
  };
  useEffect(() => {
    getTodoById();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        className="row"
        style={{
          marginBottom: 10,
          marginRight: 20,
          marginLeft: 20,
          alignSelf: "center",
        }}
      >
        <div
          className="ui input"
          style={{ flex: 5, marginLeft: 20, marginRight: 20 }}
        >
          <input
            type="text"
            value={newTodoName || ""}
            onChange={(e) => setNewTodoName(e.target.value)}
          />
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
            className="ui positive basic button"
            onClick={() => {
              updateTodo();
            }}
          >
            Save
          </button>
          <button className="ui primary basic button" onClick={goBack}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
