import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

const get = async (token: string) => {
  return {
    data: {
      ans: true
    }
  };
};

const RootRouter = () => {
  const [logined, setLogined] = useState(false);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   (async () => {
  //     const {
  //       data: { ans }
  //     } = await get(`/login?token=${token}`);
  //     if (ans) {
  //       setLogined(true);
  //     }
  //   })();
  //   return () => {};
  // }, [token]);
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/admin" component={Admin} />
      {/* <Route
        exact
        path="/"
        render={() =>
          logined ? <Redirect to="/home" /> : <Redirect to="/login" />
        }
      /> */}
    </Router>
  );
};

export default RootRouter;
