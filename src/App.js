import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FileStorage from "./pages/FileStorage";

const App = () => {
  return (
    <div>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/" exact>
            <FileStorage />
          </Route>
          <Route path="/file-storage" exact>
            <FileStorage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
