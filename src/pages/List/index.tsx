import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button, Switch } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./index.css";

const { confirm } = Modal;

interface IListItem {
  [x: string]: any;
}
interface IArticleInfo {
  title: string;
  typeName: string;
  addTime: string;
  view_count: string;
  id: number;
}

const ArticleList: React.FC<IListItem> = ({ history }) => {
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

  //删除文章的方法
  const delArticle = (id: number) => {
    confirm({
      title: "确定要删除这篇博客文章吗?",
      content: "文章将会永远被删除，无法恢复。",
      onOk() {
        axios("http://127.0.0.1:7001/admin/delArticle" + id, {
          withCredentials: true
        }).then(res => {
          message.success("文章删除成功");
          getList();
        });
      },
      onCancel() {
        message.success("取消删除");
      }
    });
  };

  return (
    <div>
      <List
        style={{ height: "100%" }}
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
        renderItem={(item: IArticleInfo) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={4}>{item.typeName}</Col>
              <Col span={4}>{item.addTime}</Col>
              <Col span={4}>{item.view_count}</Col>

              <Col span={4}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    history.push("/admin/update/" + item.id);
                  }}
                >
                  修改
                </Button>
                &nbsp;
                <Button
                  type="danger"
                  size="small"
                  onClick={() => {
                    delArticle(item.id);
                  }}
                >
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

export default withRouter(ArticleList);
