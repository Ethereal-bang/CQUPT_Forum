import styles from "./Notice.module.css";
import {Tabs} from "antd";
import {ReactNode} from "react";

const { TabPane } = Tabs;

interface ListItem {
    name: string,
}
interface InfoItem extends ListItem {
    type: "top" | "normal", // 置顶\普通
    visit: number,  // 浏览量
    time: string,
}

function getList(list: ListItem[]):ReactNode {
    return <ul>
        {list.map(item => (
            <li>item</li>
        ))}
    </ul>
}

export const Notice = () => {
    return <>
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