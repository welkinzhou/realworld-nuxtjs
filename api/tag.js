import { get } from '@/plugins/request';
// 获取文章标签
export function getTags(params) {
    return get('/tags', params)
}

