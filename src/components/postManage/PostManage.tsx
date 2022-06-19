import React, {useEffect, useState} from "react";
import {Post} from "../../common/interfaces";
import {showPosts} from "../../api/articleApi";
import {Button, Form, Input, message, Popconfirm, Radio, Space, Table, Typography} from "antd";
import {Link, useLocation} from "react-router-dom";
import styles from "./PostManage.module.css";
import {addNotice} from "../../api/rootApi";
import {useForm} from "antd/es/form/Form";

const columns = [
    {
        title: "标题",
        dataIndex: "title",
        key: "title",
    }, {
        title: "作者",
        dataIndex: "author",
        key: "author",
    }, {
        title: "内容",
        dataIndex: "content",
        key: "content",
    }, {
        title: "发布时间",
        dataIndex: "createTime",
        key: "createTime",
    }, {
        title: "分区",
        dataIndex: "area",
        key: "area",
    }, {
        title: "操作",
        dataIndex: "operation",
        render: (_: any, record: Post) => (
            <Space>
                <Link to={"/home/article/" + record.id} state={{
                    area: record.area,
                    id: record.id,
                }}>
                    查看详情
                </Link>
                <Typography.Link>
                    置顶
                </Typography.Link>
                <Typography.Link>
                    设为精华
                </Typography.Link>
                <Popconfirm title={"确定要删除吗?"}>
                    <Typography.Link>
                        删除
                    </Typography.Link>
                </Popconfirm>
            </Space>
        )
    },
]

const { TextArea } = Input;

export const PostManage = () => {
    const location = useLocation();
    const [path, setPath] = useState<string>("");
    const [posts, setPosts] = useState<Post[]>();
    const [form] = useForm();

    const postRender = <Table dataSource={posts} columns={columns} />

    const noticeRender = <Form
        form={form}
        className={styles["form"]}
        onFinish={submitPost}
    >
        <Form.Item label={"标题"} name={"title"}
                   rules={[{ required: true}]}
        >
            <Input />
        </Form.Item>
        <Form.Item label={"正文"} name={"content"}
                   rules={[{ required: true}]}
        >
            <TextArea
                rows={10}
            />
        </Form.Item>
        <Form.Item label={"类型"} name={"area"}
                   rules={[{ required: true}]}
        >
            <Radio.Group>
                <Radio value={"notice"}>校园公告</Radio>
                <Radio value={"game"}>比赛通知</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item rules={[{ required: true}]}>
            <Button htmlType={"submit"} type={"primary"}>发布</Button>
        </Form.Item>
    </Form>

    function submitPost(values: any) {
        const {title, content, area} = values;
        addNotice(title, content, area).then(r => {
            if (r.data.flag) {
                message.success(r.data.msg);
                form.resetFields();
            } else {
                message.error(r.data.msg);
            }
        })
    }

    // 监听路径
    useEffect(() => {
        setPath(location.pathname.slice(8));
    }, [location.pathname])

    // 请求posts
    useEffect(() => {
        showPosts().then(r => {
            const res = r.data.data;
            setPosts(() => {
                const arr: Post[] = [];
                Object.keys(res).forEach(area => {
                    arr.push(...res[area]);
                })
                return arr;
            })
        })
    }, [])

    return <>
        {path === "post" ? postRender : noticeRender}
    </>
}