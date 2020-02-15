import React, { useState, useEffect } from "react";

import { Layout, Menu, Breadcrumb, Icon } from "antd";

import { Route, Link } from "react-router-dom";
import Create from "../Create";
import List from "../List";

import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: any) => {
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
              <Link className="sider-link" to="/admin/index">
                新增文章
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>
              <Link className="sider-link" to="/admin/list">
                管理文章
              </Link>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "20px 16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <div>
              <Route path="/admin/index" exact component={Create} />
              <Route path="/admin/list" exact component={List} />
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
