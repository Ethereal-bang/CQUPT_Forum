import {axiosInstance} from "./createAxios";

export const getArticle = (id: number) => {
    return axiosInstance.get("/article/" + id);
}

export const showNotices = () => {
    return axiosInstance.get("/article/notice/showAll");
}

export const showPosts = () => {
    return axiosInstance.get("/article/post/showAll");
}

export const getPost = (author: string) => {
    return axiosInstance.get("/article/post/onePosted", {
        params: {
            author,
        }
    });
}

export const getCollect = (id: number) => {
    return axiosInstance.get("/article/oneCollected", {
        params: {
            id,
        }
    })
}