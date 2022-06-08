import {axiosInstance} from "./createAxios";
import {AxiosResponse} from "axios";
const email = localStorage.getItem("email");    // 对于已登录api

export const verify = (email: string): Promise<AxiosResponse> => {
    return axiosInstance.get("/user/verify", {
        params: {
            email,
        }
    })
}

export const login = (email: string, code: string) => {
    return axiosInstance.get("/user/login", {
        params: {
            email,
            code,
        }
    })
}

export const info = () => {
    return axiosInstance.get("/user/" + email + "/info");
}

export const set = (name: string, img: string) => {
    return axiosInstance.get("user/" + email + "/set", {
        params: {
            name,
            img,
        }
    })
}

export const infoByName = (name: string) => {
    return axiosInstance.get("/user/info", {
        params: {
            name,
        }
    })
}