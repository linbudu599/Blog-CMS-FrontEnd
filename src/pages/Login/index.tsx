import React, { useState, useEffect } from "react";
import { Input, Typography, Icon, Form, Button, Spin, message } from "antd";
import axios from "axios";
import { FormComponentProps } from "antd/es/form";

import "./index.css";

const { Title, Text } = Typography;
const { Item } = Form;
const { Password } = Input;

// TODO: Package Request
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 一开始就禁用感觉不太好？
  // useEffect(() => {
  //   validateFields();
  //   return () => {};
  // }, [validateFields]);

  const checkLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    validateFields({
      force: true
    });

    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:7001/admin/login",
      data: {
        username,
        password
      },
      withCredentials: true
    });
    console.log(res);
    setIsLoading(false);

    if (res.data.code === 0) {
      message.success("登陆成功");
      localStorage.setItem("token", "fake_token");
      localStorage.setItem("openId", res.data.openId);
      window.location.replace("/admin");
    } else {
      message.error("登陆失败啦");
    }
  };

  // const usernameError = isFieldTouched("username") && getFieldError("username");
  // const passwordError = isFieldTouched("password") && getFieldError("password");

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
                id="username"
                size="large"
                placeholder="Enter your username"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                onChange={e => {
                  setUsername(e.target.value);
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
