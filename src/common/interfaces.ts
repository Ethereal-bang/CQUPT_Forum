export interface Article {
    id?: number,
    type?: "notices" | "posts",
    title?: string,
    content?: string,
    createTime?: string, // Format: 2022-06-01 09:05:58
    visit?: number,
    like?: number,
    collection?: number,
    state?: string | null,
    author?: string,
}

export interface NoticeInterface extends Article {
    author: "校园官方",
    type: "notices",
    area: "notice" | "game",
}

export interface Post extends Article {
    type: "posts",
    author?: string,
    area?: "share" | "study" | "tech" | "work",
    updateTime?: string,
    comment?: number,
}

export interface User {
    id: number,
    email: string,
    name: string,
    avatarOrder: number,
    avatarLink: string,
}

export interface News {
    _id?: number,
    sender?: number,
    name?: string,
    avatar_order?: number,
    link?: string,
    receiver?: number,
    carrier_id?: number,
    type?: string,
    content?: string,
    state?: boolean
    create_time?: string,
    area?: string,
}

export interface Statistics {
    newPosts: number,
    allUsers: number,
    comment: number,
}