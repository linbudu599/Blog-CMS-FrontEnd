import React, { useState, useEffect } from "react";
import { Input, Typography, Icon, Form, Button, Spin } from "antd";

import { FormComponentProps } from "antd/es/form";

import "./index.css";

const { Title, Text } = Typography;
const { Item } = Form;
const { Password } = Input;

// TODO: Bg Img
// TODO: Validate (use inside validator)
// TODO: Performance
// TODO: Detail
// TODO: Visitor Mode(with server side)

const Login: React.FC<FormComponentProps> = ({
  form: {
    getFieldDecorator,
    getFieldsValue,
    validateFields,
    getFieldsError,
    getFieldError,
    isFieldTouched
  }
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 一开始就禁用感觉不太好？
  // useEffect(() => {
  //   validateFields();
  //   return () => {};
  // }, [validateFields]);

  const checkLogin = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("token", "fake_token");
      window.location.replace("/admin");
    }, 1000);
    validateFields({
      force: true
    });

    console.log(getFieldsValue());
  };

  const usernameError = isFieldTouched("username") && getFieldError("username");
  const passwordError = isFieldTouched("password") && getFieldError("password");

  const hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  return (
    <Form onSubmit={checkLogin} labelAlign="left">
      <div className="login-div">
        <Spin tip="Loading..." spinning={isLoading}>
          <Item>
            {getFieldDecorator("username", {
              // trigger: "onChange",
              // validateTrigger: "onChange",
              rules: [{ required: true, message: "用户名不能为空哟" }]
            })(
              <Input
                id="userName"
                size="large"
                placeholder="Enter your userName"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                onChange={e => {
                  setUserName(e.target.value);
                }}
              />
            )}
          </Item>

          <Item>
            {getFieldDecorator("password", {
              // trigger: "onChange",
              // validateTrigger: "onChange",
              rules: [{ required: true, message: "密码不能为空哟" }]
            })(
              <Password
                id="password"
                size="large"
                placeholder="Enter your password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            )}
          </Item>

          <Button
            block
            type="primary"
            size="large"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            登陆
          </Button>
        </Spin>
      </div>
    </Form>
  );
};

const LoginForm = Form.create({ name: "login_form" })(Login);

export default LoginForm;
