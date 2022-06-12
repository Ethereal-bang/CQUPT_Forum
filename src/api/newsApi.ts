import {axiosInstance} from "./createAxios";
import {News} from "../interfaces";

export const showComment = (id: number) => {
    const url = `/news/${id}/showComment`
    return axiosInstance.get(url);
}

export const send = (news: News) => {
    const data = {
        sender: news.sender,
        receiver: news.receiver,
        carrierId: news.carrier_id,
        type: news.type,
        content: news.content,
    }
    console.log(data)
    return axiosInstance.post("/news/send", data)
}

export const received = (receiver: number) => {
    return axiosInstance.get("/news/received", {
        params: {
            receiver,
        }
    });
}

export const noReadCnt = (receiver: number) => {
    return axiosInstance.get("/news/noRead", {
        params: {
            receiver,
        }
    })
}