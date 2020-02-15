import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button, Switch } from "antd";
import axios from "axios";
import "./index.css"

const { confirm } = Modal;


interface IListItem {
  [x: string]: any;
}

const ArticleList: React.FC<IListItem> = props => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    axios({
      url: "http://127.0.0.1:7001/admin/getArticleList",
      withCredentials: true
    }).then((res: any) => {
      console.log(res);
      if (res.status === 200) {
        message.success("获取数据成功");
        setList(res.data.list);
      } else {
        message.error("获取数据失败咯");
      }
    });
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item: any) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={4}>{item.typeName}</Col>
              <Col span={4}>{item.addTime}</Col>
              <Col span={4}>{item.view_count}</Col>

              <Col span={4}>
                <Button type="primary" size="small">
                  修改
                </Button>
                &nbsp;
                <Button type="danger" size="small">
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArticleList;
