import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Specific from "./routes/Specific";
import MainEditor from "./routes/MainEditor";
import Login from "./routes/Login";
import Register from "./routes/Register";
import CodeList from "./routes/CodeList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route path="/user" exact component={CodeList} />
          <Route path="/user/:_id" exact component={Specific} />
          <Route path="/editor" exact component={MainEditor} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="*" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
