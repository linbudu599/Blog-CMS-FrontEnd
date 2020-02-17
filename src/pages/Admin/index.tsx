import React, { useState, useEffect } from "react";

import { Layout, Menu, Icon } from "antd";

import { Route, Link, Switch } from "react-router-dom";
import Create from "../Create";
import List from "../List";
import Update from "../Update";

import "./index.css";

const menu = [
  {
    to: "/admin",
    title: "新增文章"
  },
  {
    to: "/admin/list",
    title: "文章列表"
  },
  {
    to: "/admin/message",
    title: "留言管理"
  }
];

const { Header, Content, Footer, Sider } = Layout;

const LayoutComponent = () => {
  let currentKey = menu.findIndex(item => {
    return item.to === window.location.pathname;
  });
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${currentKey}`]}
          mode="inline"
        >
          <Menu.Item key="0">
            <Icon type="pie-chart" />
            <span>
              <Link className="sider-link" to="/admin">
                新增文章
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="1">
            <Icon type="desktop" />
            <span>
              <Link className="sider-link" to="/admin/list">
                管理文章
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="file" />
            <span>
              <Link className="sider-link" to="/admin/message">
                留言管理
              </Link>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "20px 15px 0px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Switch>
              <Route path="/admin" exact component={Create} />
              <Route path="/admin/list" exact component={List} />
              <Route path="/admin/update/:id" exact component={Update} />
              <Route path="/admin/message" exact component={Update} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center", padding: "15px 35px" }}>
          Ant Design ©
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
