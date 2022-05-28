import styles from "./MainLayout.module.css";
import email from "../assets/icons/email.png";
import user from "../assets/icons/user.png";
import React, {ReactNode, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "antd";
import {Login} from "../components";

interface Props {
    children: ReactNode,
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

    function close() {
        setLoginOpen(false);
    }

    return <section>
        <header className={styles["header"]}>
            <h2>邮子论坛</h2>
            <section>
                <div className={styles["no_sign"]}>
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
                <div className={styles["have_sign"]} style={{display: "none"}}>
                    <img src={email} alt={"email-icon"}/>
                    <img src={user} alt={"person-icon"}/>
                </div>
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
    </section>
}