import {useEffect, useState} from "react";
import {showReports} from "../../api/rootApi";
import {Report} from "../../common/interfaces";

const columns = [
    {
        title: "被举报者ID",
        dataIndex: "reported",
        key: "reported",
    }, {
        title: "举报者ID",
        dataIndex: "reporter",
        key: "reporter",
    }, {
        title: "类型",
        dataIndex: "type",
        key: "type",
    }, {
        title: "相关评论ID",
        dataIndex: "comment",
        key: "comment",
    }, {
        title: "相关帖子ID",
        dataIndex: "post",
        key: "post",
    }
]

export const ReportManage = () => {
    const [reports, setReports] = useState<Report[]>();

    // 请求
    useEffect(() => {
        showReports().then(r => {
            setReports(r.data.data.list)
        })
    }, [])

    return <>

    </>
}