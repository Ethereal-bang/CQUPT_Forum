import {axiosInstance} from "./createAxios";
import {AxiosResponse} from "axios";

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