import styles from "./Data.module.css";
import {useEffect, useState} from "react";
import {Statistics} from "../../common/interfaces";
import {getStatistics} from "../../api/rootApi";
import {Avatar, Card} from "antd";
import {statisticsImgMap, statisticsMap} from "../../common/map";

const { Meta } = Card;

export const Data = () => {
    const [statistics, setStatistics] = useState<Statistics>();

    // 请求
    useEffect(() => {
        getStatistics().then(r => {
            setStatistics(r.data.data.data);
        })
    })

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
    </section>
}