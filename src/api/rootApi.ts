import {axiosInstance} from "./createAxios";
import {Area} from "../common/interfaces";

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

export const getAreas = () => {
    return axiosInstance.get("/root/area");
}

export const setArea = (id: number, name: string, url: string, words: string) => {
    return axiosInstance.get("/root/setArea", {
        params: {
            id, name, url, words,
        }
    })
}