import styles from "./Root.module.css";
import {Menu} from "antd";
import {Link, Route, Routes} from "react-router-dom";
import {AreaManage, Data, PostManage, ReportManage, UserManage} from "../../components";

const items = [
    {label: <Link to={"/rooter"}>工作台</Link>, key: "home",},
    {label: <Link to={"/rooter/area"}>区块管理</Link>, key: "area"},
    {
        label: "帖子管理",
        key: "post",
        children: [
            {label: <Link to={"/rooter/post"}>帖子列表</Link>, key: "list"},
            {label: <Link to={"/rooter/notice"}>发布公告</Link>, key: "notice"},
        ]
    },
    {label: <Link to={"/rooter/user"}>用户管理</Link>, key: "user"},
    {label: <Link to={"/rooter/report"}>举报处理</Link>, key: "report"},
]

export const Root = () => {
    return <section className={styles["root"]}>
        <Menu
            mode={"inline"}
            inlineCollapsed={false}
            items={items}
            className={styles["menu"]}/>
        <section className={styles["container"]}>
            <Routes>
                <Route path={"/*"} element={<Data/>}/>
                <Route path={"/area"} element={<AreaManage/>}/>
                <Route path={"/post"} element={<PostManage/>}/>
                <Route path={"/notice"} element={<PostManage/>}/>
                <Route path={"/user"} element={<UserManage/>}/>
                <Route path={"/report"} element={<ReportManage/>}/>
            </Routes>
        </section>
    </section>
}