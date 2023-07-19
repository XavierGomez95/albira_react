import {BrowserRouter as Router } from "react-router-dom";
import TaskList from "./TaskList";


function App() {
  return (
      <div className="App">
          <Router>
              <TaskList />
          </Router>
      </div>
  );
}

export default App;
