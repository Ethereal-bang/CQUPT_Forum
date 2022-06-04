import styles from "./Login.module.css";
import {Button, Form, Input, message, Statistic} from "antd";
import React, {ReactNode, useState} from "react";
import {verify, login} from "../../api/userApi";
import {useNavigate} from "react-router-dom";

interface Props {
    callState: boolean, // 外部调用
    children: ReactNode,
}

const { Countdown } = Statistic;

export const Login = (props: Props) => {
    const {callState, children} = props;
    const [email, setEmail] = useState<string>();
    const [countdown, setCountdown] = useState<boolean>(false); // 倒计时显示状态

    // 获取验证码
    function getText() {
        if (email) {
            verify(email).then(r => {
                if (r.data.flag) {
                    // 邮件发送成功
                    message.success(r.data.msg);
                    setCountdown(true); // 显示倒计时组件
                } else {
                    message.error(r.data.msg);
                }
            });
        } else {
            message.warning("请先输入邮箱");
        }
    }

    // 提交登录
    function submit(values: any) {
        login(values.email, values.text).then(r => {
            if (r.data.flag) {  // 验证成功，可以登录
                message.success(r.data.msg);
                localStorage.setItem("email", values.email);
                window.location.reload();
            } else {
                message.error(r.data.msg);
            }
        });
    }

    return <section className={styles["login_page"]} style={callState ? {display: ""} : {display: "none"}}>
        <section className={styles["container"]}>
            <header>
                <h1>邮箱登录</h1>
                {children}
            </header>
            <Form
                onFinish={submit}
            >
                <Form.Item
                    name={"email"}
                    rules={[{
                            required: true,
                            message: "请输入邮箱号"
                    }]}
                >
                    <Input
                        placeholder={"请输入邮箱号"}
                        inputMode={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name={"text"}
                    rules={[{
                            required: true,
                            message: "请输入邮箱验证码"
                    }]}
                >
                    <section className={styles["text"]}>
                        <Input placeholder={"验证码"}/>
                        <Button onClick={getText} disabled={countdown}>
                            {countdown ?
                                <Countdown
                                    onFinish={() => setCountdown(false)}
                                    value={Date.now() + 60 * 1000}
                                    format={"ss"}
                                    className={styles["count"]}
                                />
                             :
                                <>获取验证码</>
                            }
                        </Button>
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