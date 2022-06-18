import {Button, Form, Input, message, Popconfirm, Table, Typography} from "antd";
import styles from "./AreaManage.module.css";
import {addArea, getAreas, setArea} from "../../api/rootApi";
import React, {useEffect, useState} from "react";
import {Area} from "../../common/interfaces";

export const AreaManage = () => {
    const [areas, setAreas] = useState<Area[]>();
    const [editKey, setEditKey] = useState<number>(-1);
    const [form] = Form.useForm();

    const columns = [
        {
            title: "区块名",
            dataIndex: "name",
            key: "name",
        }, {
            title: "区块宣言",
            dataIndex: "words",
            key: "words",
        }, {
            title: "区块路径名",
            dataIndex: "url",
            key: "url",
        }, {
            title: "编辑",
            dataIndex: "edit",
            render: (_: any, record: Area) => {
                return (editKey === record.id) ? (
                    <Typography.Link disabled={true}>
                        请于上方修改提交
                    </Typography.Link>
                ) : (
                    <Typography.Link disabled={editKey !== -1} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                )
            }
        }
    ]

    function submitArea(data: any) {
        const {name, url, words} = data;
        if (editKey === -1) {
            addArea(name, url, words).then(r => {
                if (r.data.flag) {
                    message.success(r.data.msg);
                } else {
                    message.error(r.data.msg);
                }
            });
        } else {    // 提交修改
            setArea(editKey, name, url, words).then(r => {
                if (r.data.flag) {
                    message.success(r.data.msg);
                    setEditKey(-1);
                } else {
                    message.error(r.data.msg);
                }
            })
        }
        form.setFieldsValue({name: "", url: "", words: ""})
    }

    function edit(record: Area) {
        setEditKey(record.id);
        form.setFieldsValue({...record});
    }

    // 请求
    useEffect(() => {
        getAreas().then(r => {
            setAreas(r.data.data.list)
        })
    }, [])

    return <>
        <Form
            form={form}
            onFinish={submitArea}
            className={styles["form"]}
            layout={"inline"}
        >
            <Form.Item
                label={"分区名称"}
                name={"name"}
            >
                <Input size={"small"}/>
            </Form.Item>
            <Form.Item
                label={"分区路径名"}
                name={"url"}
            >
                <Input size={"small"}/>
            </Form.Item>
            <Form.Item
                label={"分区宣言"}
                name={"words"}
            >
                <Input size={"small"} style={{width: 250}}/>
            </Form.Item>
            <Form.Item>
                <Button size={"small"} type={"primary"} htmlType={"submit"}>
                    {editKey === -1 ? "添加分区" : "修改分区"}
                </Button>
            </Form.Item>
        </Form>
        <Table
            columns={columns}
            dataSource={areas}
        />
    </>
}