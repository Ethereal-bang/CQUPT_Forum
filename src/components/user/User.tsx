import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import styles from "./User.module.css";
import {Breadcrumb, List, Space, Tag} from "antd";
import homeIcon from "../../assets/icons/home.png";
import Search from "antd/es/input/Search";
// import topIcon from "../../assets/icons/top.png";
import visitIcon from "../../assets/icons/visit.png";
import {News, Post} from "../../common/interfaces";
import {getCollect, getPost} from "../../api/articleApi";
import commentIcon from "../../assets/icons/comment.png";
import {areaTitleMap as areaMap} from "../../common/map";
import {received} from "../../api/newsApi";
import {userTitleMap, newsMap} from "../../common/map";


export const User = () => {
    const location = useLocation();
    const [area, setArea] = useState<string>(location.pathname.slice(11));
    const [posts, setPosts] = useState<Post[]>();
    const [news, setNews] = useState<News[]>();

    // 请求我的发布
    function posted() {
        getPost(localStorage.getItem("name") as string)
            .then(r => {
                setPosts(r.data.data.list);
            })
    }

    // 请求我的收藏
    function collected() {
        getCollect(parseInt(localStorage.getItem("id") as string))
            .then(r => {
                setPosts(r.data.data.list);
            })
    }

    // 请求消息列表
    function receivedList() {
        received(parseInt(localStorage.getItem("id") as string))
            .then(r => {
                setNews(r.data.data.list);
            })
    }

    // 监听路由
    useEffect(() => {
        setArea(location.pathname.slice(11))
        if (area === "post") {
            posted();
        } else if (area === "collect") {
            collected();
        } else {
            receivedList();
        }
    }, [area, location.pathname])

    return <>
        <header className={styles["header"]}>
            <Breadcrumb separator={">"}>
                <Breadcrumb.Item>
                    <Link to={"/home"}>
                        <img src={homeIcon} alt={"home icon"}/>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={"/home/user_" + area}>
                        个人中心-{userTitleMap[area]}
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            {/*搜索*/}
            <Search
                style={{width: 250}}
                placeholder={"搜索"}
            />
        </header>
        {area === "news" ? (
            news?.map(item => (
                <Space key={item._id} direction={"vertical"} className={styles["news_box"]}>
                    <Space>
                        <span>{item.name}</span>
                        <span style={{color: "#888888"}}>{newsMap[item.type as string]}</span>
                    </Space>
                    <p style={{fontSize: 20}}>{item.content}</p>
                    <Space>
                        {item.create_time}
                        <Link to={`/home/article/${item.carrier_id}`} state={{
                            id: item.carrier_id,
                            area: item.area,
                        }}>
                            回复
                        </Link>
                    </Space>
                </Space>
            ))
        ) : (
            <List
                itemLayout={"vertical"}
                bordered
                dataSource={posts}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<Link to={`/home/article/${item.id}`} state={{area, id: item.id}}>{item.title}</Link>}
                            description={
                                <>
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
                                            <img src={visitIcon} alt={"icon"}/>
                                            {item.visit}
                                        </div>
                                        <div>
                                            <img src={commentIcon} alt={"icon"}/>
                                            {item.comment}
                                        </div>
                                    </Space>
                                </span>
                                    </div>
                                    <Tag color={"orange"}>{areaMap[item.area as string]}</Tag>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        )}
    </>
}