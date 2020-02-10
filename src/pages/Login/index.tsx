import React, { useState, useCallback } from "react";
import { Card, Input, Icon, Button, Spin } from "antd";

import "./index.css";

// TODO: Bg Img
// TODO: Validate (use inside validator)
// TODO: Performance
// TODO: Detail
// TODO: Visitor Mode(with server side)

const Login: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("token", "fake_token");
      window.location.replace("/admin");
    }, 1000);
  }, []);

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title="JSPang Blog  System"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={e => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            {" "}
            Login in{" "}
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
