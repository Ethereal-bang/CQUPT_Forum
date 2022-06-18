import styles from "./UserManage.module.css";
import {Avatar, Card, Table} from "antd";
import {useEffect, useState} from "react";
import {showUsers} from "../../api/rootApi";
import {User} from "../../common/interfaces";
import userIcon from "../../assets/icons/user.png";

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    }, {
        title: "昵称",
        dataIndex: "name",
        key: "name",
    }, {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
    }
]

export const UserManage = () => {
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        showUsers().then(r => {
            setUsers(r.data.data.list);
        })
    }, [])

    return <>
        <Card>
            <Card.Meta
                avatar={<Avatar src={userIcon} />}
                title={"用户数量"}
            />
            {users?.length}
        </Card>
        <Table
            columns={columns}
            dataSource={users}
        />
    </>
}