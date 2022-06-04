import {axiosInstance} from "./createAxios";
import {AxiosResponse} from "axios";
const email = localStorage.getItem("email");

export const verify = (): Promise<AxiosResponse> => {
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