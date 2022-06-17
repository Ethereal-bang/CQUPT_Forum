import topIcon from "../assets/icons/top.png";
import greatIcon from "../assets/icons/great.png";
import articleIcon from "../assets/icons/article.png";
import userIcon from "../assets/icons/user.png";
import commentIcon from "../assets/icons/comment.png";

export const articleTypeMap: any = {
    share: "post",
    study: "post",
    technology: "post",
    work: "post",
    notice: "notice",
    game: "notice",
    post: "讨论区",
}

export const areaTitleMap: any = {
    share: "日常分享",
    study: "学业互助",
    technology: "技术交流",
    work: "求职讨论",
    notice: "校园公告",
    game: "比赛通知",
}

export const articleStateMap: any = {
    top: topIcon,
    great: greatIcon,
    normal: articleIcon,
}

export const userTitleMap: any = {
    post: "我的发帖",
    news: "消息中心",
    collect: "我的收藏",
}

export const newsMap: any = {
    comment: "评论了你",
    collect: "收藏了你的帖子",
    like: "赞了你的帖子",
    reply: "回复了你",
}

export const statisticsMap: any = {
    newPosts: "新增帖子数",
    allUsers: "用户数量",
    comment: "评论数",
}

export const statisticsImgMap: any = {
    newPosts: articleIcon,
    allUsers: userIcon,
    comment: commentIcon,
}