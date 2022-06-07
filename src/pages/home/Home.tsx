import {MainLayout} from "../../layouts/MainLayout";
import {Route, Routes} from "react-router-dom";
// import styles from "./Home.module.css";
import {Detail, Discuss, Notice} from "../../components";

export const Home = () => {

    return <>
        <MainLayout>
            <Routes>
                <Route path={"/discuss_share"} element={<Discuss />} />
                <Route path={"/discuss_study"} element={<Discuss />} />
                <Route path={"/discuss_technology"} element={<Discuss />} />
                <Route path={"/discuss_work"} element={<Discuss />} />
                <Route path={"/article/:id"} element={<Detail />} />
                <Route path={"/*"} element={<Notice />} />
            </Routes>
        </MainLayout>
    </>
}