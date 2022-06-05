import styles from "./Notice.module.css";
import {Breadcrumb, Tabs} from "antd";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import homeIcon from "../../assets/icons/home.png";
import Search from "antd/es/input/Search";
import {showNotices, showPosts} from "../../api/articleApi";
import {NoticeInterface, Post} from "../../interfaces";

const {TabPane} = Tabs;

function search(value: string) {
    console.log(value)
}

export const Notice = () => {
    const [infoList, setInfoList] = useState<Map<string, NoticeInterface[]>>(); // 校园告示列表
    const [postList, setPostList] = useState<Map<string, Post[]>>();

    // 请求文章
    useEffect(() => {
        showNotices()
            .then(r => {
                const {data} = r.data;
                setInfoList(infoList => {
                    infoList?.set("notice", data.notice);
                    infoList?.set("game", data.game);
                    return new Map(infoList);
                })
            })
        showPosts()
            .then(r => {
                const {data} = r.data;
                setPostList(postList => {
                    postList?.set("share", data.share);
                    postList?.set("study", data.study);
                    postList?.set("tech", data.tech);
                    postList?.set("work", data.work);
                    return new Map(postList);
                })
            })
    }, [])

    return <>
        <header className={styles["header"]}>
            {/*面包屑*/}
            <Breadcrumb separator={">"}>
                <Breadcrumb.Item>
                    <Link to={"/home"}>
                        <img src={homeIcon} alt={"home icon"}/>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    论坛首页
                </Breadcrumb.Item>
            </Breadcrumb>
            {/*论坛首页搜索框*/}
            <Search
                className={styles["search"]}
                placeholder={"搜索你感兴趣的内容"}
                onSearch={search}
            />
        </header>
        <p className={styles["info"]}>今日新增：{} 篇 帖子总数：{} 篇 在线：{} 人</p>
        <section className={styles["body"]}>
            <section className={styles["left"]}>
                <Tabs className={styles["tabs"]}>
                    <TabPane tab={"校园公告"} key={"1"}>
                    </TabPane>
                    <TabPane tab={"比赛通知"} key={"2"}>
                    </TabPane>
                </Tabs>
            </section>
            <section className={styles["right"]}>
                <section className={styles["top"]}>
                    <h4>大家都在讨论↓</h4>
                    <ul>
                    </ul>
                </section>
                <section className={styles["bottom"]}>
                    <h4>最新回复↓</h4>
                    <ul>
                    </ul>
                </section>
            </section>
        </section>
    </>
}