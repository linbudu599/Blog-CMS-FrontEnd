import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";

import MDRenderer from "../../components/MDRenderer";

import "./index.css";

interface TypeItem {
  id: string;
  typeName: string;
  orderName: number;
  icon: string;
}

const { Option } = Select;
const { TextArea } = Input;

const CreateArticle = () => {
  useEffect(() => {
    getTypeInfo();
  }, []);

  // TODO: 使用表单来收集信息？
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState<string>(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [introContent, setIntroContent] = useState(); //简介的markdown内容
  const [createAt, setCreateAt] = useState(); //发布日期
  const [updateAt, setUpdateAt] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState<number>(1); //选择的文章类别

  const changeContent = useCallback((e: ChangeEvent<any>) => {
    setArticleContent(e.target.value);
  }, []);

  const changeIntroduce = useCallback((e: ChangeEvent<any>) => {
    setIntroContent(e.target.value);
  }, []);

  const getTypeInfo = () => {
    axios
      .get("http://127.0.0.1:7001/admin/getTypeInfo", {
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        withCredentials: true
      })
      .then((res: any) => {
        console.log(res);
        if (res.data.data === "未登录") {
          localStorage.removeItem("openId");
          window.location.replace("/");
        } else {
          setTypeInfo(res.data.data);
        }
      });
  };

  const selectTypeHandler = (value: number) => {
    console.log(value);
    setSelectType(value);
  };

  const stashTmp = useCallback(() => {}, []);

  const submit = () => {
    if (!selectedType) {
      message.error("必须选择文章类别");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introContent) {
      message.error("简介不能为空");
      return false;
    } else if (!createAt) {
      message.error("发布日期不能为空");
      return false;
    }
    message.success("检验通过");

    let content = {
      type_id: articleId,
      title: articleTitle,
      article_content: articleContent,
      intro: introContent,
      addTime: new Date(createAt.replace("-", "/")).getTime() / 1000
    };

    console.log(content);

    if (articleId === 0) {
      Object.assign({}, content, {
        view_count: 0
      });

      axios({
        method: "POST",
        url: "http://127.0.0.1:7001/admin/addArticle",
        data: content,
        withCredentials: true
      }).then((res: any) => {
        setArticleId(res.data.insertId);
        if (res.data.isScuccess) {
          message.success("保存成功");
        } else {
          message.error("失败咯");
        }
      });
    } else {
      Object.assign({}, content, {
        id: articleId
      });

      axios({
        method: "POST",
        url: "http://127.0.0.1:7001/admin/updateArticle",
        data: content,
        withCredentials: true
      }).then((res: any) => {
        if (res.data.isScuccess) {
          message.success("保存成功");
        } else {
          message.error("失败咯");
        }
      });
    }
  };

  return (
    <>
      <div>
        <Row gutter={5}>
          <Col span={18}>
            <Row gutter={10}>
              <Col span={20}>
                <Input
                  placeholder="博客标题"
                  value={articleTitle}
                  size="small"
                  onChange={e => {
                    e.persist();
                    setArticleTitle(e.target.value);
                  }}
                />
              </Col>
              <Col span={4}>
                <Select
                  defaultValue={selectedType}
                  size="small"
                  onChange={selectTypeHandler}
                >
                  {typeInfo.map((item: TypeItem, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.typeName}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <br />
            <Row gutter={10}>
              <Col span={12}>
                <TextArea
                  value={articleContent}
                  className="markdown-content"
                  rows={35}
                  onChange={changeContent}
                  onPressEnter={changeContent}
                  placeholder="文章内容"
                />
              </Col>
              <Col span={12}>
                <div className="show-html">
                  <MDRenderer content={articleContent} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <Button size="small">暂存文章</Button>&nbsp;
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    submit();
                  }}
                >
                  发布文章
                </Button>
                <br />
              </Col>
              <Col span={24}>
                <br />
                <TextArea
                  rows={4}
                  placeholder="文章简介"
                  onChange={changeIntroduce}
                  onPressEnter={changeIntroduce}
                />
                <br />
                <br />
                <div className="introduce-html">
                  <MDRenderer content={introContent} />
                </div>
              </Col>
              <Col span={11}>
                <div className="date-select">
                  <DatePicker
                    placeholder="发布日期"
                    size="small"
                    onChange={(date, dateString: string): void => {
                      setCreateAt(dateString);
                    }}
                  />
                </div>
              </Col>
              <Col span={11} offset={1}>
                <div className="date-select">
                  <DatePicker
                    placeholder="修改日期"
                    size="small"
                    onChange={(date, dateString: string): void => {
                      setUpdateAt(dateString);
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreateArticle;
