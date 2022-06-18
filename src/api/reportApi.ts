import {axiosInstance} from "./createAxios";

export const addReport = (type: string, reporter: number, reported: string, content: string, post?: number, comment?: number) => {
    return axiosInstance.get("/report/add", {
        params: {
            type, reporter, reported, post, comment, content
        }
    });
}

export const delReport = (id: number) => {
    return axiosInstance.get("/report/del", {
        params: {
            id,
        }
    })
}