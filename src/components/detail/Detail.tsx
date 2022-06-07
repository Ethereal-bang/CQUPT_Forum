import styles from "./Detail.module.css";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Avatar, Breadcrumb, Button, Input, Space} from "antd";
import homeIcon from "../../assets/icons/home.png";
import Search from "antd/es/input/Search";
import {titleMap} from "../discuss/Discuss";
import {getArticle} from "../../api/articleApi";
import {Post} from "../../interfaces";
import visitIcon from "../../assets/icons/visit.png";

export const Detail = () => {
    const state = useLocation().state as {area: string, id: number};
    const [area, setArea] = useState<string>(state.area);
    const [id, setId] = useState<number>(state.id);
    const [article, setArticle] = useState<Post>();

    // 更新area, id
    useEffect(() => {
        setArea(state.area);
        setId(state.id);
    }, [state])

    // 请求文章
    useEffect(() => {
        getArticle(id)
            .then(r => {
                console.log(r.data.data.articles)
                setArticle(r.data.data.articles);
            })
    }, [id])

    return <>
        <header className={styles["header"]}>
            <Breadcrumb separator={">"}>
                <Breadcrumb.Item>
                    <Link to={"/home"}>
                        <img src={homeIcon} alt={"home icon"}/>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    讨论区-{titleMap[area]}
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
        <section className={styles["article"]}>
            <h1 className={styles["title"]}>{article?.title}</h1>
            <section>
                <Space>
                    {article?.author}
                    {article?.createTime}
                    <>
                        <img src={visitIcon} alt={"icon"} />
                        {article?.visit}
                    </>
                </Space>
                <Button style={{float: "right"}}>举报</Button>
            </section>
            <div>
                {article?.content}
            </div>
        </section>
        <section className={styles["comment"]}>
            <h1>评论</h1>
            <section className={styles["post"]}>
                <Avatar />
                <span>{article?.author}（我）</span>
                <Input placeholder={"评论一下吧"} />
                <Button>发布</Button>
            </section>
            {/*评论列表*/}
        </section>
    </>
}