import styles from "./Login.module.css";
import {Button, Form, Input} from "antd";
import React, {ReactNode} from "react";

interface Props {
    callState: boolean, // 外部调用
    children: ReactNode,
}

export const Login = (props: Props) => {
    const {callState, children} = props;

    function submit(values: any) {
        console.log(values)
    }

    return <section className={styles["login_page"]} style={callState ? {display: ""} : {display: "none"}}>
        <section className={styles["container"]}>
            <header>
                <h1>手机登录</h1>
                {children}
            </header>
            <Form
                onFinish={submit}
                initialValues={{
                    prefix: "86"
                }}
            >
                <Form.Item
                    name={"phone"}
                    rules={[{
                            required: true,
                            message: "请输入手机号"
                    }]}
                >
                    <Input
                        placeholder={"请输入手机号"}
                        inputMode={"tel"}
                        addonBefore={"+86"}
                    />
                </Form.Item>
                <Form.Item
                    name={"text"}
                    rules={[{
                            required: true,
                            message: "请输入短信验证码"
                    }]}
                >
                    <section className={styles["text"]}>
                        <Input placeholder={"验证码"}/>
                        <Button>获取验证码</Button>
                    </section>
                </Form.Item>
                <Form.Item>
                    <Button
                        className={styles["submit"]}
                        type={"primary"} htmlType={"submit"}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
            <p>
                注册登录即表示同意
                <a> 用户协议</a>
                、
                <a>隐私政策</a>
            </p>
        </section>
    </section>
}