import React, { useState, useCallback, ChangeEvent } from "react";
import { Row, Col, Input, Select, Button, DatePicker } from "antd";

import MDRenderer from "../../components/MDRenderer";

import "./index.css";

const { Option } = Select;
const { TextArea } = Input;

const CreateArticle = () => {
  // TODO: 使用表单来收集信息？
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [introContent, setIntroContent] = useState(); //简介的markdown内容
  const [createAt, setCreateAt] = useState(); //发布日期
  const [updateAt, setUpdateAt] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

  const changeContent = useCallback((e: ChangeEvent<any>) => {
    setArticleContent(e.target.value);
  }, []);

  const changeIntroduce = useCallback((e: ChangeEvent<any>) => {
    setIntroContent(e.target.value);
  }, []);

  const changeCreateAt = useCallback((date: any, dateString: string) => {
    // 最后保存什么格式待定
    setCreateAt(dateString);
  }, []);

  const changeUpdateAt = useCallback((date: any, dateString: string) => {
    console.log(date, dateString);
    setUpdateAt(dateString);
  }, []);

  const stashTmp = useCallback(() => {}, []);

  const submit = useCallback(() => {}, []);

  return (
    <>
      <div>
        <Row gutter={5}>
          <Col span={18}>
            <Row gutter={10}>
              <Col span={20}>
                <Input placeholder="博客标题" size="small" />
              </Col>
              <Col span={4}>
                <Select defaultValue="Sign Up1" size="small">
                  <Option value="Sign Up1">视频教程1</Option>
                  <Option value="Sign Up2">视频教程2</Option>
                  <Option value="Sign Up3">视频教程3</Option>
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
                <Button type="primary" size="small">
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
                    onChange={changeCreateAt}
                  />
                </div>
              </Col>
              <Col span={11} offset={1}>
                <div className="date-select">
                  <DatePicker
                    placeholder="修改日期"
                    size="small"
                    onChange={(date, dateString) => {
                      changeUpdateAt(date, dateString);
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
