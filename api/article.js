import { get, post, del } from '@/plugins/request';
/**
 * 获取文章列表
 * @param {Object} params 
 * @returns 文章列表数据 { articles: 文章列表, articlesCount: 文章总数}
 * 
 * params： 
 * limit=20 分页大小 
 * offset 偏移量（类似页码） 
 * tag 文章类型标签
 * favorited 用户点赞的数据
 */
export function getArticles(params) {
    return get('/articles', params)
}

export function getFeedArticles(params) {
    return get('/articles/feed', params)
}

// 点赞
export const addFavorite = slug => {
    return post(`/articles/${slug}/favorite`)
}

// 取消点赞
export const delFavorite = slug => {
    return del(`/articles/${slug}/favorite`)
}

// 获取文章详情
export const getArticle = slug => {
    return get(`/articles/${slug}`)
}

// 获取文章评论
export const getComments = slug => {
    return get(`/articles/${slug}/comments`)
}