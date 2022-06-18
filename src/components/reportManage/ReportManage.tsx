import {useEffect, useState} from "react";
import {showReports} from "../../api/rootApi";
import {Report} from "../../common/interfaces";
import {message, Table, Typography} from "antd";
import {delReport} from "../../api/reportApi";

export const ReportManage = () => {
    const [reports, setReports] = useState<Report[]>();

    const columns = [
        {
            title: "被举报者昵称",
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
            title: "被举报内容",
            dataIndex: "content",
            key: "content",
        }, {
            title: "操作",
            dataIndex: "delete",
            render: (_:any, record: Report) => (
                <Typography.Link onClick={() => handleDel(record.id)}>
                    删除对应内容
                </Typography.Link>
            )
        }
    ]

    function handleDel(id: number) {
        delReport(id).then(r => {
            message.success(r.data.msg);
            renderList();
        })
    }

    // 请求
    function renderList() {
        showReports().then(r => {
            setReports(r.data.data.list)
        })
    }

    useEffect(() => {
        renderList();
    }, [])

    return <>
        <Table
            columns={columns}
            dataSource={reports}
        />
    </>
}