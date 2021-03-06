import styles from "./MainLayout.module.css";
import email from "../assets/icons/email.png";
import user from "../assets/icons/user.png";
import React, {ReactNode, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Avatar, Badge, Button, Card, Dropdown, Form, Input, Menu, message, Modal, Radio} from "antd";
import {Login} from "../components";
import {showAll} from "../api/avatarApi";
import {info, set} from "../api/userApi";
import {noReadCnt} from "../api/newsApi";

interface Props {
    children: ReactNode,
}

interface AvatarItem {
    order: number,
    link: string,
}

interface User {
    name?: string,
    avatarLink?: string,
    avatarOrder?: number,
}

const menuItems: ({ title: string, children: ({ name: string; link: string })[] })[] = [
    {
        title: "讨论区",
        children: [
            {name: "日常分享", link: "/home/discuss_share"},
            {name: "学业互助", link: "/home/discuss_study"},
            {name: "技术交流", link: "/home/discuss_technology"},
            {name: "求职讨论", link: "/home/discuss_work"},
        ]
    }, {
        title: "个人中心",
        children: [
            {name: "我的发帖", link: "/home/user_post"},
            {name: "我的收藏", link: "/home/user_collect"},
            {name: "消息中心", link: "/home/user_news"},
        ]
    }
]

export const MainLayout = (props: Props) => {
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [loginState, setLoginState] = useState<boolean>(false);
    const [avatarList, setAvatarList] = useState<AvatarItem[]>();
    const [infoState, setInfoState] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<User>();
    const [noRead, setNoRead] = useState<number>(0);

    const userItems = <Menu items={[
        {
            key: "1",
            label: <Button
                onClick={() => setInfoState(true)}
            >个人资料</Button>
        }, {
            key: "2",
            label: <Button onClick={() => {
                localStorage.removeItem("email")
                window.location.reload();
            }
            }>退出登录</Button>
        }
    ]}/>

    /*获取登录状态*/
    useEffect(() => {
        if (localStorage.getItem("email")) {
            setLoginState(true);
        }
    }, [])
    
    // 请求头像列表、个人信息
    useEffect(() => {
        /*获取头像列表*/
        showAll()
            .then(r => {
                setAvatarList(r.data.data.list);
            })
        // 获取个人信息
        info().then(r => {
            setUserInfo(r.data.data.user);
        });
    }, [])

    // 未读消息数
    useEffect(() => {
        if (loginState) {
            noReadCnt(parseInt(localStorage.getItem("id") as string))
                .then(r => {
                    setNoRead(r.data.data.count);
                })
        }
    }, [loginState])

    /*关闭登录框*/
    function close() {
        setLoginOpen(false);
    }

    // 提交修改个人资料
    function submitInfo(value: any) {
        set(value.name, value.img).then(r => {
            const data = r.data;
            if (data.flag) {
                message.success(data.msg);
            } else {
                message.error(data.msg);
            }
        })
    }

    return <section>
        <header className={styles["header"]}>
            <h2>邮子论坛</h2>
            <section>
                {loginState ?
                    <div className={styles["have_sign"]}>
                        <Badge count={noRead}>
                            <Link to={"/home/user_news"} onClick={window.location.reload}>
                                <img src={email} alt={"email-icon"} />
                            </Link>
                        </Badge>
                        <Dropdown overlay={userItems}>
                            <img src={user} alt={"person-icon"}/>
                        </Dropdown>
                    </div>
                    : <div className={styles["no_sign"]}>
                        <span>当前为游客模式</span>
                        <Button
                            onClick={() => setLoginOpen(true)}
                        >
                            登录
                        </Button>
                        <Button
                            onClick={() => setLoginOpen(true)}
                        >
                            注册
                        </Button>
                    </div>
                }

            </section>
        </header>
        <section className={styles["body"]}>
            <section className={styles["menu"]}>
                <div>
                    <h1>{menuItems[0].title}</h1>
                    {menuItems[0].children.map(i => (
                        <div key={i.name}>
                            <Link to={i.link}>{i.name}</Link>
                        </div>
                    ))}
                </div>
                <div>
                    <h1>{menuItems[1].title}</h1>
                    {menuItems[1].children.map(i => (
                        <div key={i.name}>
                            <Link to={i.link}>{i.name}</Link>
                        </div>
                    ))}
                </div>
            </section>
            <section className={styles["content"]}>
                {props.children}
            </section>
        </section>
        {/*登录框*/}
        <Login callState={loginOpen}>
            <button
                className={styles["close"]}
                onClick={close}
            >
                <span>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em"
                         fill="currentColor" aria-hidden="true">
                        <path
                            d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                        />
                    </svg>
                </span>
            </button>
        </Login>
        {/*设置个人信息框*/}
        <Modal
            title={"修改个人信息"}
            visible={infoState}
            footer={null}
            onCancel={() => setInfoState(false)}
        >
            <Form
                onFinish={submitInfo}
            >
                <Form.Item
                    label={"用户名"}
                    name={"name"}
                    rules={[{
                        required: true,
                        message: "请输入用户名"
                    }]}
                >
                    <Input
                        inputMode={"text"}
                        placeholder={"用户名"}
                        value={userInfo?.name}
                        onChange={(e) => setUserInfo({
                            ...userInfo,
                            name: e.target.value,
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label={"头像"}
                    name={"img"}
                    rules={[{
                        required: true,
                        message: "请选择头像"
                    }]}
                >
                    <Radio.Group>
                        {avatarList?.map(item =>
                            <Radio key={item.order} value={item.order}>
                                <Avatar src={item.link}/>
                            </Radio>
                        )}
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button
                        type={"primary"} htmlType={"submit"}
                    >
                        提交修改
                    </Button>
                </Form.Item>
            </Form>
            <Card title={"当前个人信息"}>
                <Avatar src={userInfo?.avatarLink}/>
                <span>{userInfo?.name}</span>
            </Card>
        </Modal>
    </section>
}