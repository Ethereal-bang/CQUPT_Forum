import {MainLayout} from "../../layouts/MainLayout";
import {Breadcrumb} from "antd";
import {Link, Route, Routes} from "react-router-dom";
import homeIcon from "../../assets/icons/home.png";
import {Input} from "antd";
import styles from "./Home.module.css";
import {Notice} from "../../components";

const { Search } = Input;

const navItems = [
    {
        name: "",
        icon: homeIcon,
    }
];

export const Home = () => {

    function search(value: string) {
        console.log(value)
    }

    return <>
        <MainLayout>
            <header className={styles["header"]}>
                {/*面包屑*/}
                <Breadcrumb separator={">"}>
                    <Breadcrumb.Item key={"notice"}>
                        <Link to={"/home/notice"}>
                            <img src={homeIcon} alt={"home icon"} />
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*论坛首页搜索框*/}
                <Search
                    className={styles["search"]}
                    placeholder={"搜索你感兴趣的内容"}
                    onSearch={search}
                />
            </header>
            <Routes>
                <Route path={"/notice"} element={<Notice />} />
            </Routes>
        </MainLayout>
    </>
}