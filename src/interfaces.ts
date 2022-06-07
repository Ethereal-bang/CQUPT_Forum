export interface Article {
    id: number,
    type: "notices" | "posts",
    title: string,
    content: string,
    createTime: string, // Format: 2022-06-01 09:05:58
    visit: number,
    like: number,
    collection: number,
    state: string | null,
}

export interface NoticeInterface extends Article {
    type: "notices",
    area: "notice" | "game",
}

export interface Post extends Article {
    type: "posts",
    area: "share" | "study" | "tech" | "work",
    updateTime: string,
    comment: number,
}