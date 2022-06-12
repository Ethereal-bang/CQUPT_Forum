import styles from "./Detail.module.css";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Avatar, Breadcrumb, Button, Input, message, Space} from "antd";
import homeIcon from "../../assets/icons/home.png";
import Search from "antd/es/input/Search";
import {titleMap} from "../discuss/Discuss";
import {getArticle} from "../../api/articleApi";
import {News, Post, User} from "../../interfaces";
import visitIcon from "../../assets/icons/visit.png";
import {infoByName} from "../../api/userApi";
import {send, showComment} from "../../api/newsApi";

interface CommentPost extends News {
    type: "comment" | "reply",
    toComment?: string,  // 被回复的内容
}

export const Detail = () => {
    const state = useLocation().state as { area: string, id: number };
    const [area, setArea] = useState<string>(state.area);
    const [id, setId] = useState<number>(state.id); // 文章id
    const [article, setArticle] = useState<Post>({type: "posts"});
    const [author, setAuthor] = useState<User>();
    const [comment, setComment] = useState<CommentPost>({
        type: "comment",
        sender: parseInt(localStorage.getItem("id") as string)
    });
    const [comments, setComments] = useState<News[]>();

    // 更新area, id
    useEffect(() => {
        setArea(state.area);
        setId(state.id);
    }, [state])

    // 请求文章、作者信息、评论列表
    useEffect(() => {
        getArticle(id)
            .then(r => {
                const {articles} = r.data.data;
                setArticle(articles);
                infoByName(articles.author)
                    .then(r => {
                        const {user} = r.data.data;
                        setAuthor(user)
                        setComment(comment => {
                            return {
                                ...comment,
                                receiver: user.id,
                                carrier_id: articles?.id
                            }
                        })
                    })
            })
        showComment(id)
            .then(r => {
                setComments(r.data.data.list);
            })
    }, [id])

    function postComment() {
        send(comment)
            .then(r => {
                if (r.data.flag) {
                    message.success(r.data.msg);
                } else {
                    message.error(r.data.msg);
                }
            });
    }

    function commentOn(news: News) {
        setComment({
            ...comment,
            type: "reply",
            receiver: news.receiver,
            name: news.name,
            toComment: news.content,
        })
    }

    function likeOrCollect(type: "like" | "collect") {
        let news: News = {
            sender: parseInt(localStorage.getItem("id") as string),
            receiver: author?.id,
            carrier_id: article?.id,
            type,
            content: article?.title,
        };
        send(news)
            .then(r => {
                if (r.data.flag) {
                    message.success(r.data.msg);
                    setArticle(article => {
                        if (type === "like") {
                            return {
                                ...article,
                                like: article.like as number + 1,
                            }
                        } else {
                            return {
                                ...article,
                                collection: article.collection as number + 1,
                            }
                        }
                    })
                } else {
                    message.error(r.data.msg);
                }
            })
    }

    return <>
        <header className={styles["header"]}>
            <Breadcrumb separator={">"}>
                <Breadcrumb.Item>
                    <Link to={"/home"}>
                        <img src={homeIcon} alt={"home icon"}/>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={"/home/discuss_" + area}>
                        讨论区-{titleMap[area]}
                    </Link>
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
                        <img src={visitIcon} alt={"icon"}/>
                        {article?.visit}
                    </>
                </Space>
                <Button style={{float: "right"}}>举报</Button>
            </section>
            <div>
                {article?.content}
            </div>
            <div>
                <Button size={"small"} onClick={() => likeOrCollect("like")}>点赞 | {article?.like}</Button>
                <Button size={"small"} onClick={() => likeOrCollect("collect")}>收藏 | {article?.collection}</Button>
            </div>
        </section>
        <section className={styles["comment"]}>
            <h1>评论</h1>
            <section className={styles["post"]}>
                <Avatar src={author?.avatarLink}/>
                <span>{article?.author}（我）</span>
                {comment.type === "reply" && <Space>
                    <span>to: {comment.name}</span>
                    <i>“ {comment.toComment} ”</i>
                </Space>}
                <Input placeholder={"评论一下吧"} value={comment?.content} onChange={
                    (e) => setComment({...comment, content: e.target.value})
                }/>
                <Button onClick={postComment}>发布</Button>
            </section>
            {/*评论列表*/}
            <section>
                {comments?.map(item => (
                    <section className={styles["comment_box"]} key={item._id}>
                        <div>
                            <Avatar src={item.link}/>
                            <span>{item.name}</span>
                            <Button size={"small"}>...</Button>
                        </div>
                        <p>{item.content}</p>
                        <Space>
                            <span>{item.create_time}</span>
                            <Button size={"small"} onClick={() => commentOn(item)}>回复</Button>
                        </Space>
                    </section>
                ))}
            </section>
        </section>
    </>
}