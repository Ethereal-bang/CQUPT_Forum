import styles from "./MainLayout.module.css";
import email from "../assets/icons/email.png";
import user from "../assets/icons/user.png";
import React, {ReactNode} from "react";
import {Link} from "react-router-dom";

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

    return <section>
        <header className={styles["header"]}>
            <h2>邮子论坛</h2>
            <section>
                <img src={email} alt={"email-icon"}/>
                <img src={user} alt={"person-icon"}/>
            </section>
        </header>
        <section className={styles["body"]}>
            <section className={styles["menu"]}>
                <div>
                    <h1>{menuItems[0].title}</h1>
                    {menuItems[0].children.map(i => (
                        <div>
                            <Link to={i.link}>{i.name}</Link>
                        </div>
                    ))}
                </div>
                <div>
                    <h1>{menuItems[1].title}</h1>
                    {menuItems[1].children.map(i => (
                        <div>
                            <Link to={i.link}>{i.name}</Link>
                        </div>
                    ))}
                </div>
            </section>
            <section className={styles["content"]}>
                {props.children}
            </section>
        </section>
    </section>
}