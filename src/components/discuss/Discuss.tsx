import {Breadcrumb, Button, List, Space} from "antd";
import {Link, useLocation} from "react-router-dom";
import homeIcon from "../../assets/icons/home.png";
import {useEffect, useState} from "react";
import Search from "antd/es/input/Search";
import styles from "../discuss/Discuss.module.css";
import topIcon from "../../assets/icons/top.png";
import visitIcon from "../../assets/icons/visit.png";
import {Post} from "../../common/interfaces";
import {showPosts} from "../../api/articleApi";
import {areaTitleMap} from "../../common/map";

// 应该请求
const barMap: any = {
    share: "尽情分享你的乐趣生活~",
    study: "学业互助，成就更好的我们~",
    technology: "重邮技术栈，非同一般！",
    work: "我们都能找到满意的工作~",
}

export const Discuss = () => {
    const location = useLocation();
    const [area, setArea] = useState<string>(location.pathname.slice(14));
    const [posts, setPosts] = useState<Post[]>();

    // 监听路由
    useEffect(() => {
        setArea(location.pathname.slice(14))
    }, [location.pathname])

    // 请求帖子
    useEffect(() => {
        showPosts()
            .then(r => {
                setPosts(r.data.data[area]);
            })
    }, [area])

    return <>
        <header className={styles["header"]}>
            <Breadcrumb separator={">"}>
                <Breadcrumb.Item>
                    <Link to={"/home"}>
                        <img src={homeIcon} alt={"home icon"}/>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    讨论区-{areaTitleMap[area]}
                </Breadcrumb.Item>
            </Breadcrumb>
            <section>
                <Search
                    className={styles["search"]}
                    placeholder={"搜索你感兴趣的内容"}
                    // onSearch={search}
                />
                <Button
                    style={{marginLeft: 15}}
                >发表帖子</Button>
            </section>
        </header>
        <div
            className={styles["banner"]}
        >{barMap[area]}</div>
        <List
            className={styles["list"]}
            itemLayout={"vertical"}
            bordered
            dataSource={posts}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<img src={topIcon} alt={"icon"}/>}
                        title={<Link to={`/home/article/${item.id}`} state={{area, id: item.id}}>{item.title}</Link>}
                        description={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Space>
                                    {item.createTime}
                                    {item.author}
                                </Space>
                                <span>
                                    <Space>
                                        <div>
                                            <img src={visitIcon} alt={"icon"} style={{width: 18}} />
                                            &nbsp;{item.visit}
                                        </div>
                                        <div>
                                            {/*评论量icon*/}
                                            {item.comment}
                                        </div>
                                    </Space>
                                </span>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    </>
}