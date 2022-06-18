import {axiosInstance} from "./createAxios";

export const getStatistics = () => {
    return axiosInstance.get("/root/data");
}

export const addArea = (name: string, url: string, words: string) => {
    return axiosInstance.get("/root/addArea", {
        params: {
            name, url, words
        },
    });
}