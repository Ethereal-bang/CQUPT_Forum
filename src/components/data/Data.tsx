import styles from "./Data.module.css";
import {useEffect, useState} from "react";
import {NoticeInterface, Statistics} from "../../common/interfaces";
import {getStatistics} from "../../api/rootApi";
import {Avatar, Card, Table} from "antd";
import {statisticsImgMap, statisticsMap} from "../../common/map";
import {showNotices} from "../../api/articleApi";

const { Meta } = Card;

const columns = [
    {
        title: "标题",
        dataIndex: "title",
        key: "title",
    }, {
        title: "正文",
        dataIndex: "content",
        key: "content",
        ellipsis: true,
    }, {
        title: "发布时间",
        dataIndex: "createTime",
        key: "createTime",
    },
]

export const Data = () => {
    const [statistics, setStatistics] = useState<Statistics>();
    const [notices, setNotices] = useState<NoticeInterface[]>();

    // 请求
    useEffect(() => {
        getStatistics().then(r => {
            setStatistics(r.data.data.data);
        })
        showNotices().then(r => {
            const {data} = r.data;
            const arr = [...data.game, ...data.notice]
            setNotices(arr);
        })
    }, [])

    return <section className={styles["container"]}>
        <section className={styles["box"]}>
            {statistics && Object.keys(statistics).map(key => (
                <Card
                    key={key}
                    className={styles["statistic"]}
                >
                    <Meta
                        avatar={<Avatar src={statisticsImgMap[key]} />}
                        title={statisticsMap[key]}
                    />
                    {/*@ts-ignore*/}
                    {statistics[key]}
                </Card>
            ))}
        </section>
        <Table
            columns={columns}
            dataSource={notices}
        />
    </section>
}