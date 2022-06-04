import {axiosInstance} from "./createAxios";

export const showAll = () => {
    return axiosInstance.get("/avatar/showAll");
}