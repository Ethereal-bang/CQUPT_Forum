import {axiosInstance} from "./createAxios";

export const getStatistics = () => {
    return axiosInstance.get("/root/data");
}