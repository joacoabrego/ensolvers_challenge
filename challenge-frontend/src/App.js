import TodoList from "./components/TodoList";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <div>
        <TodoList />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
