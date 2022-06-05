import {MainLayout} from "../../layouts/MainLayout";
import {Route, Routes} from "react-router-dom";
import styles from "./Home.module.css";
import {Notice} from "../../components";

export const Home = () => {

    return <>
        <MainLayout>
            <Routes>
                <Route path={"/*"} element={<Notice />} />
            </Routes>
        </MainLayout>
    </>
}