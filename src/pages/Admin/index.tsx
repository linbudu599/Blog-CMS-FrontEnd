import React, { useState, useEffect } from "react";

import { Layout, Menu, Breadcrumb, Icon } from "antd";

import { Route, Link } from "react-router-dom";
import Create from "../Create";

import "./index.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: any) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>
              <Link to="/admin/index">新增文章</Link>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>管理文章</span>
          </Menu.Item>
          {/* <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>User</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "20px 16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <div>
              <Route path="/admin/index" exact component={Create} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
