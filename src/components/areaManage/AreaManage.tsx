import {Button, Form, Input, message} from "antd";
import styles from "./AreaManage.module.css";
import {addArea} from "../../api/rootApi";

export const AreaManage = () => {

    function submitAddArea(data: any) {
        const {name, url, words} = data;
        addArea(name, url, words).then(r => {
            if (r.data.flag) {
                message.success(r.data.msg);
            } else {
                message.error(r.data.msg);
            }
        });
    }

    return <>
        <Form
            onFinish={submitAddArea}
            className={styles["form"]}
            layout={"inline"}
        >
            <Form.Item
                label={"分区名称"}
                name={"name"}
            >
                <Input size={"small"} />
            </Form.Item>
            <Form.Item
                label={"分区路径名"}
                name={"url"}
            >
                <Input size={"small"} />
            </Form.Item>
            <Form.Item
                label={"分区宣言"}
                name={"words"}
            >
                <Input size={"small"} style={{width: 250}} />
            </Form.Item>
            <Form.Item>
                <Button size={"small"} type={"primary"} htmlType={"submit"}>添加分区</Button>
            </Form.Item>
        </Form>

    </>
}