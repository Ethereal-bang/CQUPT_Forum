import styles from "./Notice.module.css";
import {Breadcrumb, List, Tabs} from "antd";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import homeIcon from "../../assets/icons/home.png";
import Search from "antd/es/input/Search";
import {mostComment, recentComment, showNotices} from "../../api/articleApi";
import {NoticeInterface, Post} from "../../common/interfaces";
import visitIcon from "../../assets/icons/visit.png";
import {areaTitleMap, articleStateMap} from "../../common/map";

const {TabPane} = Tabs;

function search(value: string) {
    console.log(value)
}

export const Notice = () => {
    const [infoList, setInfoList] = useState<Map<string, NoticeInterface[]>>(); // 校园告示列表
    const [mostCommentPosts, setMostCommentPosts] = useState<Post[]>(); // ”大家都在讨论“
    const [recentCommentPosts, setRecentCommentPosts] = useState<Post[]>(); // 最新回复

    // 请求公告、正在讨论
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
        mostComment()
            .then(r => {
                setMostCommentPosts(r.data.data.list);
            })
        recentComment()
            .then(r => {
                setRecentCommentPosts(r.data.data.list)
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
                        <List
                            className={styles["list"]}
                            itemLayout={"vertical"}
                            bordered
                            dataSource={infoList?.get("notice")}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={articleStateMap[item.state as string]} alt={"icon"} />}
                                        title={<Link to={`/home/article/${item.id}`} >
                                            {item.title}
                                        </Link>}
                                        description={
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <span>{item.createTime}</span>
                                                <span>
                                                    <img src={visitIcon} alt={"icon"} style={{width: 18}} />
                                                    {item.visit}
                                                </span>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                    <TabPane tab={"比赛通知"} key={"2"}>
                        <List
                            className={styles["list"]}
                            itemLayout={"vertical"}
                            dataSource={infoList?.get("game")}
                            bordered
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={articleStateMap[item.state as string]} alt={"icon"} />}
                                        title={<Link to={`/home/article/${item.id}`} state={{
                                            area: item.area,
                                            id: item.id,
                                        }} >
                                            {item.title}
                                        </Link>}
                                        description={
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <span>{item.createTime}</span>
                                                <span>
                                                    <img src={visitIcon} alt={"icon"} style={{width: 18}} />
                                                    {item.visit}
                                                </span>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </TabPane>
                </Tabs>
            </section>
            <section className={styles["right"]}>
                <section className={styles["top"]}>
                    <h4>大家都在讨论↓</h4>
                    <ul className={styles["comment_post"]}>
                        {mostCommentPosts?.map(item => (
                            <li key={item.id}>
                                [<span style={{color: "red"}}>{areaTitleMap[item.area as string]}</span>]&nbsp;
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className={styles["bottom"]}>
                    <h4>最新回复↓</h4>
                    <ul className={styles["comment_post"]}>
                        {recentCommentPosts?.map(item => (
                            <li key={item.id}>
                                [<span style={{color: "red"}}>{areaTitleMap[item.area as string]}</span>]&nbsp;
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </section>
    </>
}