import {MainLayout} from "../../layouts/MainLayout";
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";
import homeIcon from "../../assets/icons/home.png";

const navItems = [
    {
        name: "",
        icon: homeIcon,
    }
];

export const Home = () => {
    return <>
        <MainLayout>
            <header>
                <Breadcrumb separator={">"}>
                    <Breadcrumb.Item key={"notice"}>
                        <Link to={"/home/notice"}>Home</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </header>
        </MainLayout>
    </>
}