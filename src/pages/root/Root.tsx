import styles from "./Root.module.css";
import {Menu} from "antd";
import {Link, Route, Routes} from "react-router-dom";
import {AreaManage, Data} from "../../components";

const items = [
    { label: <Link to={"/rooter"}>工作台</Link>, key: "home", },
    { label: <Link to={"/rooter/area"}>区块管理</Link>, key: "area" },
    { label: <Link to={"/rooter/post"}>帖子管理</Link>, key: "post" },
    { label: <Link to={"/rooter/user"}>用户管理</Link>, key: "user" },
    { label: <Link to={"/rooter/report"}>举报处理</Link>, key: "report" },
]

export const Root = () => {
    return <section className={styles["root"]}>
        <Menu items={items} className={styles["menu"]}/>
        <section className={styles["container"]}>
            <Routes>
                <Route path={"/*"} element={<Data />} />
                <Route path={"/area"} element={<AreaManage />} />
            </Routes>
        </section>
    </section>
}