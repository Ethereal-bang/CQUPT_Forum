import {axiosInstance} from "./createAxios";

export const addReport = (type: string, reporter: number, reported: string, post?: number, comment?: number) => {
    return axiosInstance.get("/report/add", {
        params: {
            type, reporter, reported, post, comment,
        }
    });
}