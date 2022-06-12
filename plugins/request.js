import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.realworld.io/api'
})
// 为了能在 SSR 中拿到 Vue 全局对象的属性
// 使用 Nuxt 提供的插件机制
export default ({ store }) => {
    // 请求拦截器
    instance.interceptors.request.use(function (config) {
        const { user } = store.state
        if (user && user.token) {
            // 传入 Token
            config.headers.Authorization = `Token ${user.token}`
        }
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    // 请求拦截器
    instance.interceptors.response.use(function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    });
}



export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance.get(url, { params })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function del(url) {
    return new Promise((resolve, reject) => {
        instance.delete(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


