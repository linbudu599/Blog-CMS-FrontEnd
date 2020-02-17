import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

const RootRouter = () => {
  const [logined, setLogined] = useState(true);
  const token = localStorage.getItem("token");

  // TODO: auth at initialize
  return (
    <Router>
      <Route
        exact
        path="/"
        render={() =>
          logined ? <Redirect to="/admin" /> : <Redirect to="/login" />
        }
      />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
    </Router>
  );
};

export default RootRouter;
